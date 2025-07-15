import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Category } from "../models/category.model.js";
import { ApiResponce } from "../utils/ApiResponse.js";
// -------------------( Create Category - Admin )---------------------
const createCategory = asyncHandler( async(req, res) => {
    console.log(req.body)
    
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
    const {_id} = req.params;
    const isDeleted = await Category.findByIdAndDelete({
        _id
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

    const {_id} = req.params
    const {name} = req.body;
    if(!name){
        throw new ApiError(
            400,
            "Missing required field."
        )
    }


    const updatedCategory = await Category.findByIdAndUpdate(
        { _id },
        {
            ...(name && {name}),
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

export {
    createCategory,
    getAllCategories,
    deleteCategory,
    updatedCategory
}