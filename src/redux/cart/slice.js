import { createSlice } from "@reduxjs/toolkit";
import { setScroll } from "../../utils/utils";

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
    (sum, { price, discount, qty }) => {
      if (discount) {
        return sum + discount * qty;
      }

      return sum + price * qty;
    },
    0
  );
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      state.items.push(payload);
      calculateQty(state);
      calculateTotalPrice(state);
    },
    removeCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload);
      calculateQty(state);
      calculateTotalPrice(state);
    },
    addQty: (state, { payload }) => {
      state.items.forEach((item) => {
        if (item.id === payload) {
          item.qty++;
        }

        return item;
      });
      calculateQty(state);
      calculateTotalPrice(state);
    },
    decreaseQty: (state, { payload }) => {
      state.items.forEach((item) => {
        if (item.id === payload && item.qty > 1) {
          item.qty--;
        }

        return item;
      });
      calculateQty(state);
      calculateTotalPrice(state);
    },
    setIsOpen: (state, { payload }) => {
      state.isOpen = payload;
      setScroll(!payload);
    },
  },
});

export const { setIsOpen, addCart, removeCart, addQty, decreaseQty } =
  slice.actions;

export const cartReducer = slice.reducer;
