import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    isLoading: { main: true, messages: true, submit: true }
  },

  reducers: {
    startLoading: (state, action) => {
      state.isLoading[action.payload.type] = true;
    },

    stopLoading: (state, action) => {
      state.isLoading[action.payload.type] = false;
    }
  }
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export const selectIsLoading = (state) => state.isLoading.isLoading;

export default loadingSlice.reducer;
