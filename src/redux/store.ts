import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/main";
export const store = configureStore({
  reducer: {
    mainSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;