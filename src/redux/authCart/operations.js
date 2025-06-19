import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const getCartItems = createAsyncThunk(
  "authCart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/cart");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "authCart/addItemToCart",
  async (product, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post("/cart/add", product);
      dispatch(getCartItems());
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const patchCartItem = createAsyncThunk(
  "authCart/patchCartItem",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/cart/update", payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "authCart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
