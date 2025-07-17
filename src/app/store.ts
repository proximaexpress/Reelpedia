import { configureStore } from "@reduxjs/toolkit";

import savedReducer from "~/features/saved/savedSlice";
import uiReducer from "~/features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    saved: savedReducer,
    ui: uiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
