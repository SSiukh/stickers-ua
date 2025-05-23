import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations";

const initialState = {
    user: {
        name: "",
        email: "",
        role: "",
        phoneNumber: "",
    },
    token: "",
    isLoggedIn: false,
    isRefreshing: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.data.user;
                state.token = payload.data.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = { ...state.user, ...payload.data.user };
                state.token = payload.data.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logout.fulfilled, () => initialState)
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, { payload }) => {
                state.user = payload.data.user;
                state.token = payload.data.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            });
    },
});

export const authReducer = slice.reducer;
