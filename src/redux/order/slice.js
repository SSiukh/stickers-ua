import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactData: {
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
  },
  items: [],
  delivery: {
    type: "",
    location: null,
  },
  comment: "",
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setContactData: (state, { payload }) => {
      state.contactData = payload;
    },
    setOrderItems: (state, { payload }) => {
      state.items = { payload };
    },
    setDeliveryType: (state, { payload }) => {
      state.delivery.type = payload;
    },
    setLocation: (state, { payload }) => {
      state.delivery.location = payload;
    },
    setComment: (state, { payload }) => {
      state.comment = payload;
    },
  },
});

export const {
  setContactData,
  setOrderItems,
  setDeliveryType,
  setLocation,
  setComment,
} = slice.actions;

export const orderReducer = slice.reducer;
