import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const getLocationsByName = createAsyncThunk(
    "locations/getLocationsByName",
    async (cityName, thunkAPI) => {
        try {
            const { data } = await api.get("/locations", {
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
