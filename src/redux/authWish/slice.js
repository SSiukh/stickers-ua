import { createSlice } from "@reduxjs/toolkit";
import { getWishItems, removeWishItem } from "./operations";

const initialState = {
  items: [],
};

const slice = createSlice({
  name: "authWish",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWishItems.fulfilled, (state, { payload }) => {
        state.items = payload.data;
      })
      .addCase(removeWishItem.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(
          (item) => item.productId._id !== payload
        );
      });
  },
});

export const authWishReducer = slice.reducer;
