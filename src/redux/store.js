import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishReducer from "./wishSlice";
import filtersReducer from "./filtersSlice";
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
});
