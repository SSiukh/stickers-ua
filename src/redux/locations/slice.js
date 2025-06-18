import { createSlice } from "@reduxjs/toolkit";
import { getLocationsByName, getWarehousesByIdName } from "./operations";

const initialState = {
  keyword: "",
  settlements: [],
  warehouseKeyword: "",
  warehouses: [],
};

const slice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocationsKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
    setWarehousesKeyword: (state, { payload }) => {
      state.warehouseKeyword = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationsByName.fulfilled, (state, { payload }) => {
        state.settlements = payload[0];
      })
      .addCase(getWarehousesByIdName.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.warehouseKeyword = payload[0];
      });
  },
});

export const { setLocationsKeyword, setWarehousesKeyword } = slice.actions;

export const locationsReducer = slice.reducer;
