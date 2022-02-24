import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
import isLoadingReducer from "../Features/loadingSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    isLoading: isLoadingReducer,
  },
});
