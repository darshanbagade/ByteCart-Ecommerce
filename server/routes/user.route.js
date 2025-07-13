import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
    register,
    userLogin, 
    userLogout,
    getCurrentUser,
    updatePassword,
    refreshAccessToken,
    updateDetails,
    deleteAccount

 } from '../controllers/user.controller.js';


const userRouter = Router();


userRouter.route('/register').post(upload.single('avatar'),register)

userRouter.route('/login').post(userLogin)

userRouter.route('/logout').post(verifyJWT, userLogout)

userRouter.route('/current-user').get(verifyJWT,getCurrentUser)

userRouter.route('/refresh-token').post(refreshAccessToken)

userRouter.route('/change-password').patch(verifyJWT,updatePassword)

userRouter.route('/chanage-datails').patch(verifyJWT, updateDetails)

userRouter.route('/delete-account').delete(verifyJWT, deleteAccount)

export {userRouter}