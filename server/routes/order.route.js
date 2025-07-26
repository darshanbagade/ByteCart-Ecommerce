import {Router} from "express";
import { verifyJWT} from '../middlewares/auth.middleware.js'
import {isAdmin} from '../middlewares/isAdmin.middleware.js'
import { cancelOrder, createSingleProductOrder, getMyOrders, getSingleOrder, updateOrderStatus, updatePaymentStatus } from "../controllers/order.controller.js";


const orderRouter = Router();


orderRouter.route('/create').post(verifyJWT, createSingleProductOrder)
orderRouter.route('/all').get(verifyJWT, getMyOrders);
orderRouter.route('/:_id').get(verifyJWT, getSingleOrder);
orderRouter.route('/cancel').patch(verifyJWT, cancelOrder);


orderRouter.route('/update-payment-status').patch(verifyJWT,isAdmin, updatePaymentStatus);
orderRouter.route('/update-order-status').patch(verifyJWT,isAdmin, updateOrderStatus);

export { orderRouter }