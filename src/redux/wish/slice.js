import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "wish",
  initialState: {},
  reducers: {
    addWish: (state, action) => {},
    removeWish: (state, action) => {},
  },
});

export const wishReducer = slice.reducer;
