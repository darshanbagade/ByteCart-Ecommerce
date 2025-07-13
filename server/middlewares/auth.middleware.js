import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

//this is not pre defined middleware, written to add more functionalities
//this middleware is verifying the Access token from user with the servers

export const verifyJWT = asyncHandler( async (req, _ , next) =>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     //Authorization coming from the app
  
     if(!token){
         throw new ApiError(401, "Unauthorized request")
     }
 
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
        
     const user = await User.findById(decodedToken?._id).select(
         " -password"
     )
 
     if(!user){
         throw new ApiError(401, "Invalid Access Token")
     }
     
     req.user = user;
     next();
 
   } catch (error) {
    throw new ApiError(401, "Invalid Access Token")    
   }
})