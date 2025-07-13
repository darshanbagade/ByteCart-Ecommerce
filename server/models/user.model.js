import { Schema,model } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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
        default : 'user',
        required : true
    },
    avatar : {
        type: String , //CloudinaryURL
    },
    // refreshToken : {
    //     type : String
    // },
    dob:{
        type:Date
    }

}, { timestamps : true})


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
})


const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';

userSchema.methods.generateAccessToken =  function(){
    return  jwt.sign(
        {
            _id :this._id,
            username : this.username,
            email:this.email,
            fullname :this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY || '15m'
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id :this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:  REFRESH_TOKEN_EXPIRY || '7d'
        }
    )
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


export const User = model('User',userSchema);
