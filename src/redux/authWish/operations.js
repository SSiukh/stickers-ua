import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const getWishItems = createAsyncThunk(
  "authWish/getWishItems",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/wish");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addItemToWish = createAsyncThunk(
  "authWish/addItemToWish",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post("/wish/add", { productId });
      dispatch(getWishItems());
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeWishItem = createAsyncThunk(
  "authWish/removeWishItem",
  async (productId, thunkAPI) => {
    try {
      await api.delete(`/wish/remove/${productId}`);

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
