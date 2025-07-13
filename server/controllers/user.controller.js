import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {getImagekit} from "../configs/imagekit.js";
import fs from 'fs'
import { Token } from "../models/token.model.js";
import { ApiResponce } from "../utils/ApiResponse..js";
import ms from 'ms';


//------------------------Create Account---------------------------
const register = asyncHandler(async (req,res,next)=>{

    const {username, email, fullname , password , phone, dob } = req.body;

    //for security purpose no user can login as 'admin'  from anywhere(postman,.etc)
    // if (req.user.role !== "admin") throw res.status(403).json({ message: "Access denied" });
    // console.log(req.body)
    if( [username,email,password,phone,fullname ]
        .some( (field) =>(
            field?.trim() === ""
        ))){
        throw new ApiError(401, "Missing required fields");
    }

    const existedUser = await User.findOne({
        $or :[{username}, {email},{phone}]
    })
    

    if(existedUser){
       throw new ApiError(400,"User already exist with this email/username or phone"); 
    }


    // const avatar = req.file;
    let avatarLocalPath = req.file ? req.file.path : null;
    let avatarImage;

    // Get ImageKit instance when needed (after env is loaded)
    const imagekit = getImagekit();
    if(avatarLocalPath){
            // Check if file exists before reading
        if (!fs.existsSync(avatarLocalPath)) {
            throw new ApiError(400, "Uploaded file not found");
        }

        let avatarBuffer = fs.readFileSync(avatarLocalPath)
        const response = await imagekit.upload({
            file : avatarBuffer,
            fileName : `${username}-avatar`,
            folder : '/avatar'
        })
          const optimizatedImageUrl =  imagekit.url({
            path: response.filePath,
            transformation :[
                {quality : 'auto'}, //auto compression
                {format : 'webp'},  //convert to modern format            ]
                { width: '1280'}    // width resixing
            ]
        })
        avatarImage = optimizatedImageUrl;
        // console.log(avatarImage)
        fs.unlinkSync(avatarLocalPath);

    }

    const userData = {
        username,
        fullname,
        phone,
        email,
        password,
        dob,
        role : "user",
        avatar : avatarImage || "" 
        
    }

    const user = await User.create(userData);

    
    //select the files which you want to remove
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    //-------------returning responce------------------------------------
    return res.status(201).json(
       new ApiResponce(200, createdUser , "User Created Successfully")
    )

});




// ---------------------------Log-In----------------------------
const generateAccessRefreshToken = async (userId)=>{
    try {
        const user  = await User.findById(userId)
        // console.log(user);
        
        if(!user){
            throw ApiError(404,"User not found")
        }
        
        const accessToken  = await user.generateAccessToken()
        const refreshToken  =  user.generateRefreshToken()  
        const expiry = new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY || "7d"));

        const token = await Token.findOne({ user: userId, isRevoked: false });

        if (!token) {
            await Token.create({
                user: userId,
                refreshToken,
                expiresAt: expiry,
                isRevoked: false,
            });
        } else {
            token.refreshToken = refreshToken;
            token.expiresAt = expiry;
            await token.save({ validateBeforeSave: false });
        }

        return {accessToken, refreshToken};
        
    } catch (error) {
        throw new ApiError(500, "Unable to generate Acceess / Refresh Token")
    }
}
//LogIn Controller 
// 1. fetch data from frontend
// 2. check data came or not,
// 3. check user exist or not
// 4. if ,check password 
// 5. create access , refresh token
// 6. send data save to cookie , send response
const userLogin = asyncHandler( async (req,res) =>{
    
    const {email, phone, username, password} = req.body;
    if((!email && !phone && !username) ){
        throw new ApiError(400, "username or email is required")
    }
    if((!password)){
        throw new ApiError(400, "password is required")
    }
    
    const user = await User.findOne({
        $or :[ {username}, {email}, {phone} ]
    })
    if(!user){
        throw new ApiError(400, "User does not not exist, Go to sign up !")
    }


    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid password");
    }
    
    const { refreshToken, accessToken } = await generateAccessRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password"
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken,options)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponce(
            200,
            {loggedInUser,refreshToken,accessToken}
            ,
            "User logged in Successfully"
        )
    )
} )


//--------------------------Log Out user ------------------------

const userLogout = asyncHandler(async (req,res)=>{
    const userId = req.user._id //comes from auth.middleware.js -> verifyjwt

     const token = await Token.deleteMany({
        user:userId,
        isRevoked:false
     })
     console.log(token);
     
    if(!token){
        throw new ApiError(400, " token not found")
    }
    const options = {
        httpOnly : true,
        secure :true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponce(
            200,
            {},
            "User Logged out succefully"
        )
    )
})

//-------------------------Get current User ---------------------
const getCurrentUser = asyncHandler( async (req,res) =>{
    const user = req.user;
    
    if(!user){
        throw new ApiError(400, "Invalid Request, Login ")
    }
    
    const currentUser = await User.findById(user._id).select("-password")
    console.log(currentUser);

    if(!currentUser){
        throw new ApiError(400, "User not Found ")  
    }
    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            currentUser,
            "Current User fetched successfully"

        )
    )
})


//-----------------------RefreshAccessToken----------------------

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Unauthorized. Refresh token missing");
    }

    try {
        // 1. Verify token signature & expiry
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        // 2. Find the token in DB (match user + token + not revoked)
        const tokenDoc = await Token.findOne({
            user: decoded._id,
            refreshToken: incomingRefreshToken,
            isRevoked: false
        });

        if (!tokenDoc) {
            throw new ApiError(401, "Refresh token not found or revoked");
        }

        // 3. Find the user
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // 4. Generate new access & refresh tokens
        const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

        // 5. Update the token document in DB
        tokenDoc.refreshToken = refreshToken;
        tokenDoc.expiresAt = new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY || '7d'));
        await tokenDoc.save();

        // 6. Set cookies
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        };

        // 7. Send response
        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponce(200, { refreshToken, accessToken }, "Access Token Refreshed")
            );

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new ApiError(401, "Refresh token expired. Please login again.");
        }
        throw new ApiError(401, "Invalid refresh token");
    }
});


// -----------------------Update Password-------------------------
const updatePassword = asyncHandler(async ( req, res )=>{
    const {oldPassword, newPassword, confirmNewPassword} = req.body;

    if(!oldPassword || !newPassword || !confirmNewPassword){
        return new ApiError(400, "missing password")
    }
    // console.log(req.body)
    if(newPassword !== confirmNewPassword){
        return ApiError(200, "Confirm password do not matching")
    }

    const userId = req.user._id;// this dont contain the password field
    const user = await User.findById(userId)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    console.log(isPasswordCorrect);
    
    if(!isPasswordCorrect){
        throw new ApiError(
            400,"invalid old password"
        )
    }

    user.password = newPassword
    await user.save()

    return res
    .status(300)
    .json(
        new ApiResponce(
            200,"Password Updated Succefully"
        )
    )

})


//------------------------UpdateDetails--------------------------
const updateDetails = asyncHandler (async ( req, res) =>{
    const userId = req.user._id; //from auth.middleware.js

    if(!userId){
        throw new ApiError(400, "no user found")
    }
    const { updatedUsername, updatedEmail, updatedPhone, updatedFullname } = req.body;

    if(!updatedUsername && !updatedEmail && !updatedPhone && !updatedFullname ){
        throw new ApiError(400, "enter the new details");
    }

    const updatedData = {
        username:updatedUsername,
        email:updatedEmail,
        phone: updatedPhone,
        fullname :updatedFullname
    }

    await User.findByIdAndUpdate(userId,updatedData,{new:true}) //new:true ->return updated Document

    const updatedDetails  = await User.findById(userId).select(
        [ '-password']
    );

    return res.status(200)
    .json(
        new ApiResponce(
            200,
            updateDetails,
            "Profile updated Successfully"
        )
    )
})


//------------------------Delete Account --------------------------
const deleteAccount = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    // Delete user from DB
    await User.findByIdAndDelete(user._id);

    // Delete all refresh tokens of the user
    await Token.deleteMany({
        user: user._id
    });

    // Clear cookies
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    };

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponce(
                200,
                {},
                "User account deleted successfully"
            )
        );
});


export {
    register,
    userLogin,
    userLogout,
    updatePassword,
    refreshAccessToken,
    updateDetails,
    getCurrentUser,
    deleteAccount
}