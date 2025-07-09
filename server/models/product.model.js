import mongoose from 'mongoose'
const productSchema =  new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    }
    ,
    description :{
        type :String,
        required  : true
    },
    price : {
        type : Number,
        default : 0,
        required : true 
    },
    images:{
        type : Array,
        required : true
    },
    stock :{
        type : Number,
        required: true,
        default : 0,
    },
    brand : {
        type : String ,
        default : ''
    },
    features :{
        type: Array
    }, 
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    ratingAvg :{
        
    },
    reviews :{
        
    }
},{
    timestamps : true
})

export const Product = mongoose.model('Model',productSchema);