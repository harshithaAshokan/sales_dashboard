import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    username:"",
    reset_key:"",
    otp:""
}

const loginReducer = createSlice({
    name:"login",
    initialState,
    reducers:{
        handleLogin:(state,actions) => {
            state.token = actions.payload
        },
        handleUserName : (state,action) => {
            state.username = action.payload
        },
        handleResetKey : (state,action) => {
            state.reset_key = action.payload
        },
        handleOtp : (state,action) => {
            state.otp = action.payload
        }
    }
})

export const {handleLogin,handleUserName,handleResetKey,handleOtp} = loginReducer.actions
export default loginReducer.reducer

