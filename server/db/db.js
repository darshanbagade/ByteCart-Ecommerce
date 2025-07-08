import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
// import dotenv from 'dotenv'

// dotenv.config({
//     path: '../.env'

// })
const connectDB = async ()=>{
    try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
    console.log("Mongo DB Connected : ", connectionInstance.connection.host);
    }catch(error){
        console.log("DB Connection faild :", error.message);
        process.exit(1);
    }
}

export {connectDB};