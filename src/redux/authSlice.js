import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {},
        register: (state, action) => {},
    }
})

export const { login, register } = slice.actions;
export default slice.reducer;