import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishReducer from "./wishSlice";
import filtersReducer from "./filtersSlice";

// use Redux Persist for local.storage

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishReducer,
    filters: filtersReducer,
  },
});
