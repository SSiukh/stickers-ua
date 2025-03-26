import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: {
    keyword: "",
    category: "Всі категорії",
    color: "",
  },
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.filter.category = payload;
    },
    setKeyword: (state, { payload }) => {
      state.filter.keyword = payload;
    },
    setColor: (state, { payload }) => {
      state.filter.color = payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase();
  // },
});

export const { setCategory, setKeyword, setColor } = slice.actions;

export const productsReducer = slice.reducer;
