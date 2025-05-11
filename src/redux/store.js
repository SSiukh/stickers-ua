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

export const store = configureStore({
    reducer: {
        cart: persistReducer(persistConfig, cartReducer),
        wish: wishReducer,
        products: productsReducer,
        auth: persistReducer(authPersistConfig, authReducer),
        order: orderReducer,
        locations: locationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
