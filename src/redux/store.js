import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/slice";
import { wishReducer } from "./wish/slice";
import { productsReducer } from "./products/slice";
import { authReducer } from "./auth/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cart",
  version: 1,
  storage,
  whitelist: "items, info",
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
    wish: wishReducer,
    products: productsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
