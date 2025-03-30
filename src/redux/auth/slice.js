import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: null,
    email: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    middleName: null,
  },
  token: null,
  isLoggedIn: false,
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
  // extraReducers: (builder) => {
  //   builder.addCase(login.fulfilled, (state, { payload }) => {
  //     state.user = payload;
  //     state.isLoggedIn = true;
  //   });
  // },
});

export const { login, register } = slice.actions;
export const authReducer = slice.reducer;
