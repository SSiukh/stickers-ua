import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: {
    keyword: "",
  },
};

const slice = createSlice({
  name: "products",
  initialState,
  // extraReducers: (builder) => {
  //   builder.addCase();
  // },
});

export const productsReducer = slice.reducer;
