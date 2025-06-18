import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/slice";
import { wishReducer } from "./wish/slice";
import { productsReducer } from "./products/slice";
import { authReducer } from "./auth/slice";
import { orderReducer } from "./order/slice";
import { locationsReducer } from "./locations/slice";
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
import { loaderReducer } from "./loader/slice";

const persistConfig = {
  key: "cart",
  version: 1,
  storage,
  whitelist: "items, info",
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const wishPersistConfig = {
  key: "wish",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
    wish: persistReducer(wishPersistConfig, wishReducer),
    products: productsReducer,
    loader: loaderReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    order: orderReducer,
    locations: locationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
