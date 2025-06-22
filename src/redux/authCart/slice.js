import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  clearCart,
  getCartItems,
  patchCartItem,
  removeCartItem,
} from "./operations";

const initialState = {
  items: [],
  isOpen: false,
  info: {
    qty: 0,
    totalPrice: 0,
  },
};

const calculateQty = (state) => {
  state.info.qty = state.items.length;
};

const calculateTotalPrice = (state) => {
  state.info.totalPrice = state.items.reduce(
    (sum, { productId: { price, discount }, quantity }) => {
      if (discount) {
        return sum + discount * quantity;
      }

      return sum + price * quantity;
    },
    0
  );
};

const slice = createSlice({
  name: "authCart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        calculateQty(state);
        calculateTotalPrice(state);
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.items = payload.data;
        calculateQty(state);
        calculateTotalPrice(state);
      })
      .addCase(patchCartItem.fulfilled, (state, { payload }) => {
        state.items = state.items.map((item) => {
          if (item.productId._id === payload.data.productId) {
            item.quantity = payload.data.quantity;
          }
          return item;
        });
        calculateQty(state);
        calculateTotalPrice(state);
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        calculateQty(state);
        calculateTotalPrice(state);
      })
      .addCase(clearCart.fulfilled, () => initialState);
  },
});

export const authCartReducer = slice.reducer;
