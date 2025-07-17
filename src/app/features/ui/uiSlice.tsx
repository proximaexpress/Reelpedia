import { createSlice } from "@reduxjs/toolkit";

import type { Article } from "~/components/article-card/article-card";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  display: Article | undefined;
}

const initialState: UIState = {
  display: undefined,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    display: (state, action: PayloadAction<Article>) => {
      state.display = action.payload;
    },
  },
});

export const { display } = uiSlice.actions;

export default uiSlice.reducer;
