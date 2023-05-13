import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "./coordinates/coordinatesSlice";

export default configureStore({
  reducer: {
    coordinates: coordinatesReducer,
  },
});
