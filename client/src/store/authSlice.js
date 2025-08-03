import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData :null,
    status : false
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action)=>{
            state.status = true,
            state.userData  = action.payload
        },
        logout : (state, action)=>{
            state.status = false;
            state.userData = null
        }
    }
})

export const authReducer = authSlice.reducer;// to access from store

export const {login,logout} = authSlice.actions;