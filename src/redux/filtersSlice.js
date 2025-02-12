import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {},
  reducers: {
    setCategory: (state, action) => {},
    setQuery: (state, action) => {},
  },
});

export const { setCategory, setQuery } = slice.actions;
export default slice.reducer;
