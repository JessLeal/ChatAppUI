import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    checkUser: (state, action) => {
      state.user = action.payload;
    },

    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = {};
    },

    signUp: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { checkUser, login, logout, signUp } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
