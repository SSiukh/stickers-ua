import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const getLocationsByName = createAsyncThunk(
  "locations/getLocationsByName",
  async (cityName, thunkAPI) => {
    try {
      const { data } = await api.get("/np/locations", {
        params: {
          cityName,
          limit: 20,
          page: 1,
        },
      });
      return data.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getWarehousesByIdName = createAsyncThunk(
  "locations/getWarehousesByIdName",
  async ({ cityName, warehouseId }, thunkAPI) => {
    try {
      const { data } = await api.get("/np/warehouses", {
        params: {
          cityName,
          warehouseId,
          limit: 20,
          page: 1,
        },
      });
      return data.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
