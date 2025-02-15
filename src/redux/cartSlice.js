import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  info: {
    qty: 0,
    totalPrice: 0,
  }
}

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {},
    removeCart: (state, action) => {},
    calculateQty: (state) => {
      state.info.qty = state.items.length;
    },
    calculateTotalPrice: (state) => {
      state.info.totalPrice = state.items.reduce((sum, { price, qty }) => (sum + price * qty), 0);
    }
  },
});

export const { addCart, removeCart, calculateQty, calculateTotalPrice } = slice.actions;

export default slice.reducer;
