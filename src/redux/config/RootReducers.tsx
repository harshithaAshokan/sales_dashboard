import { combineReducers } from "@reduxjs/toolkit";
import AuthReducers from "../reducers/AuthReducers";
import LoginReducers from "../reducers/LoginReducers";
export const rootReducers=combineReducers({
    auth:AuthReducers,
    login:LoginReducers,
})