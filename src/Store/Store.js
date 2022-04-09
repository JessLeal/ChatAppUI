import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/userSlice';
import isLoadingReducer from '../Features/loadingSlice';
import themeReducer from '../Features/themeSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    isLoading: isLoadingReducer,
    theme: themeReducer
  }
});
