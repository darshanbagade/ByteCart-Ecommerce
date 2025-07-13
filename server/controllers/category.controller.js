import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { Category } from "../models/category.model.js";
import { ApiResponce } from "../utils/ApiResponse.";

// -------------------( Create Category - Admin )---------------------
const createCategory = asyncHandler( async(req, res) => {
    const { name, slug } = req.body

    if(!name || !slug){
        throw new ApiError( 400, "missing required fields" )
    }
    const category = await Category.create({
        name, slug
    })
    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            category,
            "category created successfully"
        )
    )
}) 

//----------------( Get all Categories - Public Access )-------------
const getAllCategories = asyncHandler( async (req, res)=>{

    const categories = await Category.find({})//return array
    
    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            categories,
            "Categories fetched successfully"
        )
    )
})


//-----------------( Delete Category - Admin )-------------------
const deleteCategory = asyncHandler( async(req, res) =>{
    const {slug} = req.params;
    const isDeleted = await Category.findOneAndDelete({
        slug:slug
    })
    if(!isDeleted){
        throw new ApiError(400, "Category not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            {},
            "Category has been deleted"
        )
    )
})

//-----------------( Update Category - Admin )--------------- 
const updatedCategory = asyncHandler( async(req, res) =>{

    const {slug} = req.params
    const {name, newSlug} = req.body;
    if(!slug){
        throw new ApiError(
            400,
            "Missing required field(slug)."
        )
    }


    const updatedCategory = await Category.findOneAndUpdate(
        { slug },
        {
            ...(name && {name}),
            ...(newSlug && {slug : newSlug})
        },
        { new: true } // returns updated document
    );
    if(!updatedCategory){
        throw new ApiError(400, "Unable to update the category")
    }

    return res
    .status(200)
    .json(
        new ApiResponce(
            200,
            updatedCategory,
            "Category Updated Successfully"
        )
    )

})
