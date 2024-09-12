import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./RootReducers";

export const store=configureStore({reducer:rootReducers})