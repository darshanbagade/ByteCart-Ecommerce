import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { createCategory, deleteCategory, getAllCategories, updatedCategory } from '../controllers/category.controller.js'

const categoryRouter= Router()

categoryRouter.route('/add-category').post(verifyJWT,createCategory)
categoryRouter.route('/all-categories').get(getAllCategories)
categoryRouter.route('/delete/:_id').delete(verifyJWT,deleteCategory)
categoryRouter.route('/update-category/:_id').patch(verifyJWT,updatedCategory)

export { categoryRouter }