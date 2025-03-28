import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: true,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
    },
    register: (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
    },
  },
});

export const { login, register } = slice.actions;
export const authReducer = slice.reducer;
