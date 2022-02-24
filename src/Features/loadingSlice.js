import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "isLoading",
  initialState: {
    isLoading: true,
  },

  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },

    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export const selectIsLoading = (state) => state.isLoading.isLoading;

export default loadingSlice.reducer;
