import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Cart } from "../models/cart.model.js"
import { ApiResponce} from  "../utils/ApiResponse.js"

//---------------------Add To Cart - User ------------------------
const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity, price } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity, priceAtAdd: price }],
            cartTotal: quantity * price,
        });
    } else {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, priceAtAdd: price });
        }
        cart.cartTotal = cart.items.reduce((total, item) => total + item.quantity * item.priceAtAdd, 0);
        await cart.save();
    }

    return res.status(200).json(
        new ApiResponce(
            200,
            "Item added to cart",
            cart
        )
    );
});

//---------------------Get All Cart Items - User ------------------------
const getCartList = asyncHandler( async(req,res) =>{
    try {

        const user = req.user;
        const cart = await Cart.findOne({user:user._id}).populate("items.product")
        
        if(!cart){
            throw  new ApiError( 404, "Cart is empty")
        }
        return res
        .status(200)
        .json(
            new ApiResponce(
                200,
                "Cart fetched successfully",
                cart
            )
        )

    } catch (error) {
        throw new ApiError( 
            500,
            "Unable to fetch the Cart List"
        )        
    }
})



//---------------------Remove Item from Cart - User ------------------------
const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    if(!productId){
        throw ApiError(404,"Product Id is required.");
    }
    await Cart.updateOne(
        { user: userId },
        { $pull: { items: { product: productId } } } 
        // '$pull' removes the document of that particular productId  from the array of documents
    );

    let cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ApiError(404, "Cart not found");

    cart.cartTotal = cart.items.reduce((total, item) => total + item.quantity * item.priceAtAdd, 0);
    await cart.save();

    res.status(200).json(
        new ApiResponse(
            200,
            "Cart removed Successfully.",
            cart,
            success
        )
    );
});



//----------------------Clear Cart - Development purpose - Admin -----
const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await Cart.updateOne(
        { user: userId },
        { $set: { items: [], cartTotal: 0 } }
    );

    const cart = await Cart.findOne({ user: userId });

    res.status(200).json({ success: true, cart });
});



//---------------------Update quantity - User --------------------
const updateQuantity = asyncHandler(async (req, res) =>{
    try{
        const userId = req.user._id
        const {productId, quantity} = req.body;

        const cart = await Cart.findOne({user :userId})
        if (!cart) throw new ApiError(404, "Cart not found");
        
        //findIndex give the first document if productId Matched
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
        if (itemIndex === -1) throw new ApiError(404, "Product not found in cart");

        cart.items[itemIndex].quantity = quantity ;
        cart.cartTotal = cart.items.reduce(
            (total,item) => total + item.quantity * item*priceAtAdd
            , 0
        )
        
        await cart.save();
        return res.status(200)
        .json(
            new ApiResponce(
                200,
                cart,
                "quantity updated successfully"
            )
        )
    }catch(error){
        throw new ApiError(400, "Something went Wrong")
    }
})


export {
    addToCart,
    getCartList,
    removeFromCart,
    updateQuantity,
    clearCart
}