import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
    register: (state, action) => {},
  },
});

export const authReducer = slice.reducer;
