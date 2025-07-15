import { createSlice } from "@reduxjs/toolkit";

import type { Article } from "~/components/article-card/article-card";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SavedState {
  value: Article[];
}

const initialState: SavedState = {
  value: [],
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Article>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<Article>) => {
      state.value = state.value.filter((a) => a.title != action.payload.title);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = savedSlice.actions;

export default savedSlice.reducer;
