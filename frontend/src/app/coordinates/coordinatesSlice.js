import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ id: "25544", name: "ISS (ZARYA)", coords: [" ", " "] }];

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    satAdded(state, action) {
      state.push(action.payload);
    },
    satCoordsUpdated(state, action) {
      const { id, coords } = action.payload;
      const existingSat = state.find((sat) => sat.id === id);
      if (existingSat) {
        existingSat.coords = coords;
      }
    },
  },
});
export const { satAdded, satCoordsUpdated } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;
