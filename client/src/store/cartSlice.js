import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cartCount : 0
}
const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducer:{
        addToCart : (state, action)=>{
            state.cartCount += 1;
        },
        removeFromCart : (state, action)=>{
            state.cartCount -= 1;
        }
    }
})

export const cartReducer = cartSlice.reducer;

export const {addToCart, removeFromCart}  = cartSlice.actions;
