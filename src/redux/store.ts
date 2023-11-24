import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import headerFuncSlices from "./headerFuncSlices";

export function makeStore() {
  return configureStore({
    reducer: { product: productSlice, header: headerFuncSlices },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
