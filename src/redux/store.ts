import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./productSlice";
import headerFuncSlices from "./headerFuncSlices";

const rootReducer = combineReducers({
  product: productSlice,
  header: headerFuncSlices,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["product"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
