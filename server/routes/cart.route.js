import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { 
    addToCart,
    getCartList,
    updateQuantity,
    removeFromCart,
    clearCart
 } from '../controllers/cart.controller.js';

 import {isAdmin} from '../middlewares/isAdmin.middleware.js'
const cartRouter = Router();

cartRouter.route('/add').post(verifyJWT, addToCart)

cartRouter.route('/get').get(verifyJWT,getCartList);

cartRouter.route('/remove').delete(verifyJWT,removeFromCart);

cartRouter.route('/update').patch(verifyJWT, updateQuantity)

//for development purpose - admin access
cartRouter.route('/clear').delete(verifyJWT,isAdmin,clearCart);

export { cartRouter }
