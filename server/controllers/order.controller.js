import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError} from '../utils/ApiError.js'
import { ApiResponce } from '../utils/ApiResponse.js'
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import {Cart} from '../models/cart.model.js'

// ----------------- Order from Cart ------------------
export const createOrderFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { shippingAddress, paymentMethod, paymentInfo, paymentStatus } = req.body;

  if (!shippingAddress || !paymentMethod) {
    throw new ApiError(400, "Missing Required Fields");
  }

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(404, "Cart is empty");
  }

  let totalAmount = 0;
  const orderItems = cart.items.map(item => {
    totalAmount += item.quantity * item.product.price;
    return {
      product: item.product._id,
      quantity: item.quantity
    };
  });

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    paymentInfo,
    paymentStatus,
    totalAmount
  });

  // Clear the cart after placing order
  cart.items = [];
  cart.cartTotal = 0;
  await cart.save();

  return res.status(201).json(
    new ApiResponce(201, order, "Order placed from cart successfully")
  );
});

 const createSingleProductOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity, shippingAddress, paymentMethod, paymentInfo, paymentStatus } = req.body;

  if (!productId || !quantity || !shippingAddress || !paymentMethod) {
    throw new ApiError(400, "Missing Required Fields");
  }

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const totalAmount = quantity * product.price;

  const order = await Order.create({
    user: userId,
    items: [{ product: product._id, quantity }],
    shippingAddress,
    paymentMethod,
    paymentInfo,
    paymentStatus,
    totalAmount
  });

  return res.status(201).json(
    new ApiResponce(201, order, "Order placed successfully for a single product")
  );
});

//------Get My Orders (User Access)-----
 const getMyOrders = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const orders = await Order.find({ user: user._id }).populate("items.product");

  if (!orders || orders.length === 0) {
    return res.status(200).json(
      new ApiResponce(200, [], "No orders found for this user")
    );
  }

  return res.status(200).json(
    new ApiResponce(200, orders, "Orders fetched successfully")
  );
});


// Get Single Order by ID (User/Admin)
const getSingleOrder =  asyncHandler(async (req, res) => {
    try {
        const {_id} = req.params;
  
        const order = await Order.findOne({_id}).populate("user items.product");
        // console.log(order);
        if (!order) {
            throw new ApiError(400, "Order not found");
        }
        return res.status(200).json(
            new ApiResponce(
                200,
                order,
                "Order fetched successfully"
            )
        );
    } catch (error) {
        throw new ApiError(
            500, error.message
        );
    }
});

//  Cancel Order (User Access)
const cancelOrder = asyncHandler( async (req,res)=>{
    const {orderId} = req.body;
    console.log(orderId)
    const order = await Order.findByIdAndUpdate(
      orderId,
      {orderStatus:"cancelled" },
      {new:true}
    );
    
    if (!order) {
    throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponce(
            200,
            order,
            "Order cancelled successfully"
        )
    )
} )



//Get all orders from - admin
const getAllOrders = asyncHandler( async(req,res) => {

    const orders = await Order.find({});
    if(!orders){
        throw new ApiError(400, "Unable to fetch the orders").populate("user items.product")
    }

    return res.status(200).json(
        new ApiResponce(
            200,
            "Orders fetched successfully",
            orders
        )
    )

})



// Update Order Status (Admin Access)

const updateOrderStatus = asyncHandler( async (req,res) =>{
    
    const {orderId,orderStatus} = req.body
    // console.log(orderId)
    const order = await Order.findByIdAndUpdate(
        orderId,
        {orderStatus :orderStatus},
        {new:true}
    )
    if(!order){
      new ApiError(404,"Order not found.")
    }

    return res.status(200).json(
      new ApiResponce(
        200,
        order,
        "Order Status updated Successfully"
      )
    )
})



//Update payment status
const updatePaymentStatus = asyncHandler(async (req, res) => {
    const { orderId, status, transactionId, method } = req.body;

    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, "Order not found");

    order.paymentInfo = {
        status,
        transactionId,
        method,
        paidAt: new Date()
    };
    order.paymentStatus = "paid";

    await order.save();

    return res.status(200).json({ success: true, message: "Payment info updated" });
});


export {
    createSingleProductOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder
}