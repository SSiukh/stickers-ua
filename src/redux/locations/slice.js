import { createSlice } from "@reduxjs/toolkit";
import { getLocationsByName } from "./operations";

const initialState = {
  keyword: "",
  settlements: [],
};

const slice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocationsKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationsByName.fulfilled, (state, { payload }) => {
      state.settlements = payload[0];
    });
  },
});

export const { setLocationsKeyword } = slice.actions;

export const locationsReducer = slice.reducer;
