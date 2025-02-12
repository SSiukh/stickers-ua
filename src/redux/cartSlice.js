import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addCart: (state, action) => {},
    removeCart: (state, action) => {},
    addQty: (state, action) => {},
  },
});

export const { addCart, removeCart, addQty } = slice.actions;

export default slice.reducer;
