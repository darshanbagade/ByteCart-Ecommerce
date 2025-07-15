import {Router} from  'express'
import { verifyJWT} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'
import { 
    addProduct, 
    deleteProduct, 
    getPoductList, 
    getProductDetails, 
    updateProduct 
} from '../controllers/product.controller.js'

const productRouter =  Router()

// ---------------- Admin Routes -------------------
productRouter.route('/add-product')
.post(
    verifyJWT, 
    isAdmin,
    upload.fields([
    {name:'image1', maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1}
]), addProduct)
productRouter.route('/delete/:_id').delete(verifyJWT, isAdmin, deleteProduct)
productRouter.route('/update-product/:_id').patch(verifyJWT,isAdmin,updateProduct)

// ---------------- Public Routes -------------------
productRouter.route('/').get(getPoductList)
productRouter.route('/:slug').get(getProductDetails)

export {
    productRouter
}
