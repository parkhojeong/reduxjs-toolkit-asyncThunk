import { configureStore } from "@reduxjs/toolkit";
import randomMaximReducer from "./slices/randomMaximSlice";

export default configureStore({
  reducer: {
    randomMaxim: randomMaximReducer
  }
});
