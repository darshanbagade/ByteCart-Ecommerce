//1. Add product - admin access
//2. Get all products -public access
//3. Get Product details - public access 
//4. delete product -admin access
//5. update product - admin access
//6. Search Products (by name, keyword) (User / Public)
//7. Get Featured/New/Trending Products (User / Public)

// import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponse.js";
import fs from 'fs'
import { getImagekit } from "../configs/imagekit.js";
import { Product } from '../models/product.model.js'


//----------------------Add-Product - Admin Access-------------------------
const addProduct = asyncHandler( async(req, res) =>{
  try {
    
    const { title, slug, description, price, category, brand, stock, features } = req.body ;

    if(!title || !slug || !description || !price || !category || !brand || !stock ){
        throw new ApiError(
            400, 
            "Missing required fields."
        )
    }


    const image1  = req.files.image1 && req.files.image1[0];
    const image2  = req.files.image2 && req.files.image2[0]; 
    const image3  = req.files.image3 && req.files.image3[0]; 
    const image4  = req.files.image4 && req.files.image4[0]; 
    const images =  [ image1, image2, image3, image4].filter( (image) =>( image!== undefined ))

 
    // console.log('Received files:', req.files);
    // console.log('Filtered images:', images);

    if(images.length === 0) {
        throw new ApiError(400, "At least one product image is required");
    }

    const imagekit = getImagekit()
    //uploading the images to imagekit.io
    const imageURLs = await Promise.all(
        images.map(async (image) => {

            //converting to base64
            const imageBuffer = fs.readFileSync(image.path);
            

            const response = await imagekit.upload({
                file: imageBuffer,
                fileName: image.originalname,
                folder: '/products'
            });
            
            //optimiization of the image
            const optimizatedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' }
                ]
            });

            fs.unlinkSync(image.path); 
            console.log(optimizatedImageUrl);
            
            return optimizatedImageUrl;
        })
    );

    const product = await Product.create({
        title,
        slug,
        description,
        price,
        category,//id
        brand,
        stock,
        features,
        images : imageURLs

    })
    if(!product){
        throw new ApiError(500,'Unable to add the product' )
    }

    return res.status(200).json(
        new ApiResponce(
            200,
            product,
            "Product added successfully"
        )
    )
    
  } catch (error) {
    console.error('Error in addProduct:', error);
    return res.status(500).json({ success : false , message : error.message })
  }

})


//----------------------Get all products -Public access-------------------------
const getPoductList = asyncHandler( async (req,res) =>{
    try {
        
        const products = await Product.find({}).populate('category')

        return res
        .status(200)
        .json(
            new ApiResponce(
                200,
                products,
                "Products fetched successfully"
            )
        )
        
    } catch (error) {
        throw res.json({success:false, message:error.message})
    }
})

//----------------------Get product details -Public access-------------------------
const getProductDetails = asyncHandler( async (req,res) =>{
    try {
        
        const {slug} = req.params
        console.log(slug);
        
        if(!slug){
            throw new ApiError(400,
                "missing product id "
            )
        }

        const product  = await Product.findOne({slug}).populate('category')
        if(!product){
            throw new ApiError(400, "Product not found")
        }

        return res
        .status(200)
        .json(
            new ApiResponce(
                200,
                product,
                "Product detail fetched succussfully"
            )
        )
        
    } catch (error) {
        return res.json({success :false , message : error.message})
    }
})

//----------------------Update product - Admin access-------------------------
const updateProduct = asyncHandler( async (req,res) =>{
 try {
    const {_id} = req.params
    const { title, slug, description, price, category, brand, stock, features } = req.body ;

    if(!title || !slug || !description || !price || !category || !brand || !stock ){
        throw new ApiError(
            400, 
            "Missing required fields."
        )
    }

    const image1  = req.files.image1 && req.files.image1[0];
    const image2  = req.files.image2 && req.files.image2[0];
    const image3  = req.files.image3 && req.files.image3[0];
    const image4  = req.files.image4 && req.files.image4[0];
    const images =  [ image1, image2, image3, image4].filter( (image) =>( image!== undefined ))

    const imagekit = getImagekit()
    //uploading the images to imagekit.io
    const imageURLs = await Promise.all(
        images.map(async (image) => {

            //converting to base64
            const imageBuffer = fs.readFileSync(image.path);
            
            // uploading the image on imagekit.io
            const response = await imagekit.upload({
                file: imageBuffer,
                fileName: image.originalname,
                folder: '/products'
            });
            
            //optimiization of the image
            const optimizatedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1280' }
                ]
            });

            fs.unlinkSync(image.path); 
            // console.log(optimizatedImageUrl);
            
            
            return optimizatedImageUrl;
        })
    );
    const updatedData = {
            title,
            slug,
            description,
            price,
            category, //id
            brand,
            stock,
            features,
            images: imageURLs

        }

    
    const product = await Product.findByIdAndUpdate( 
        _id, 
        updatedData,
        {
            new : true
        }
    )
    if(!product){
        throw new ApiError(500,'Unable to update the product' )
    }
     



    return res.status(200).json(
        new ApiResponce(
            200,
            product,
            "Product updated successfully"
        )
    )
    
  } catch (error) {
    return res.json({ 
        success : false , 
        message : "Something went wrong. Please try again later." })
  }
})


//----------------------Delete Product -Admin access-------------------------
const deleteProduct = asyncHandler( async (req,res) =>{
    try {
        const {_id}  = req.params
        if(!_id){
            throw new ApiError(400, "missing product id")
        }

        const deletedProduct =  await Product.findByIdAndDelete(_id)
        if(!deletedProduct){
            throw new ApiError(400, "Product not found")
        }

        return res
        .status(200)
        .json(
            new ApiResponce(
                200,
                {},
                "Product deleted successfully"
            )
        )
        

    } catch (error) {
        throw res.json({success:false, message:error.message})
    }
})



export {
    addProduct,
    getPoductList,
    deleteProduct,
    getProductDetails,
    updateProduct

}