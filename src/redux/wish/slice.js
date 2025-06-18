import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const slice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addWish: (state, { payload }) => {
      state.items.push(payload);
    },
    removeWish: (state, { payload }) => {
      state.items = state.items.filter((item) => item._id !== payload);
    },
  },
});

export const { addWish, removeWish } = slice.actions;

export const wishReducer = slice.reducer;
