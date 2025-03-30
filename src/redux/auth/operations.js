import { createAsyncThunk } from "@reduxjs/toolkit";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = credentials;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// const data = {
//   username: "Oleksandr",
//   email: "siukhsasha@gmail.com",
//   phoneNumber: "380952250783",
//   firstName: "Олександр",
//   lastName: "Сюх",
//   middleName: "Миколайович",
// };
