import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, addProduct, fetchProductById } from "./operations";
import { logout } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, { payload }) => {
  state.error = payload;
};

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = payload.data.data;
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductById.rejected, handleRejected)
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.currentItem = payload.data;
      })
      .addCase(fetchProductById.pending, handlePending)
      .addCase(addProduct.pending, handlePending)
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items.push(payload.data);
      })
      .addCase(addProduct.rejected, handleRejected)
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const { setCategory, setKeyword, setColor } = slice.actions;

export const productsReducer = slice.reducer;
