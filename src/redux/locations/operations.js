import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getLocationsByName = createAsyncThunk(
  "locations/getLocationsByName",
  async (cityName, thunkAPI) => {
    try {
      const { data } = await axios.get("/locations", {
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
