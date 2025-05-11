import axios from "axios";
import { store } from "../redux/store";
import { refreshUser } from "../redux/auth/operations";
import { setAuthHeader } from "./setAuthHeader";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let pendingRequests = [];
let isRefreshing = false;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired";

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const result = await store.dispatch(refreshUser());

        if (refreshUser.fulfilled.match(result)) {
          const newToken = result.payload.data.accessToken;
          setAuthHeader(newToken);

          pendingRequests.forEach(({ resolve }) => resolve(newToken));
          pendingRequests = [];

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }

        pendingRequests.forEach(({ reject }) =>
          reject(result.payload || "Token refresh failed")
        );
        pendingRequests = [];
        return Promise.reject(error);
      } catch (refreshError) {
        pendingRequests.forEach(({ reject }) => reject(refreshError));
        pendingRequests = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
