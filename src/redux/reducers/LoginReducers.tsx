import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("userdata")
const initialState = {
    token: "",
    username:"",
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
        handleOtp : (state,action) => {
            state.otp = action.payload
        }
    }
})

export const {handleLogin,handleUserName,handleOtp} = loginReducer.actions
export default loginReducer.reducer

