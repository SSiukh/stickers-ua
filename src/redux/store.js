import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/slice";
import { wishReducer } from "./wish/slice";
import { productsReducer } from "./products/slice";
import { authReducer } from "./auth/slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishReducer,
    products: productsReducer,
    auth: authReducer,
  },
});
