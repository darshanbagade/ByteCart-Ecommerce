import { Schema,model } from "mongoose";

const userSchema  = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        index :true, //For better search
        lowercase : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        trim: true,
        index :true,
        lowercase :true
    },
    fullname :{
        type : String ,
        required : true,
        index : true
    },
    password : {
        type : String ,
        required : [true, "Password is required"]
    },
    phone:{
        type : Number,
        required:true,
    },
    role : {
        type:String ,
        enum : [ 'user' , 'admin'],
        default : 'user'
    },
    avatar : {
        type: String , //CloudinaryURL
    },
    refreshToken : {
        type : String
    },
    dob:{
        type:Date
    }

}, { timestamps : true})


export const User = model('User',userSchema);




userSchema.methods.generateAccessToken = async(email,password,role)=>{
    return jwt.sign(
        {userId :user._id, password : user.password,email:user.email},
        process.env.ACCESS_TOKEN_SECRET
    )
}