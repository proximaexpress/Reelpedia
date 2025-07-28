import { createSlice } from "@reduxjs/toolkit";

import type { Article } from "~/components/article-card/article-card";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  device: Device;
  display: Article | undefined;
}

const initialState: UIState = {
  device: {
    type: "desktop",
    height: 0,
  },
  display: undefined,
};

interface Device {
  type: string;
  height: number;
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    initialiseDevice: (state, action: PayloadAction<Device>) => {
      state.device = action.payload;
    },
    display: (state, action: PayloadAction<Article>) => {
      state.display = action.payload;
    },
  },
});

export const { initialiseDevice, display } = uiSlice.actions;

export default uiSlice.reducer;
