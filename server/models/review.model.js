import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required : true
    },
    product :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }
} , {timestamps:true})
// Ensure a user can review a product only once
reviewSchema.index({ user:1 , product:1},{unique:true})

const Review = mongoose.model('Review',reviewSchema)