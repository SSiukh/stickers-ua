import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
    register: false,
}

const slice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state[action.payload] = true;
        },
        closeModal: (state, action) => {
            state[action.payload] = false;
        }
    }
})

export const { openModal, closeModal } = slice.actions;

export default slice.reducer;