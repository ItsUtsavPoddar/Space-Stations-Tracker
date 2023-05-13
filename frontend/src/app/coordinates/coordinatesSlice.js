import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ id: "1", name: "First Post!", coords: ["a", "a"] }];

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {},
});

export default coordinatesSlice.reducer;
