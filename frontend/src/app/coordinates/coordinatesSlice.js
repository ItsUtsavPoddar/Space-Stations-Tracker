import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ id: "1", name: "First Post!", coords: ["a", "a"] }];

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    satAdded(state, action) {
      state.push(action.payload);
    },
  },
});
export const { satAdded } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
