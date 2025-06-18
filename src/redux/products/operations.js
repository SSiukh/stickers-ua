import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params, thunkAPI) => {
    try {
      const { data } = await api.get("/stickers", { params });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addContact",
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post("/stickers", body);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  `products/fetchById`,
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/stickers/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
