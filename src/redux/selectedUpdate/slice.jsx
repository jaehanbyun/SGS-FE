import { createSlice } from "@reduxjs/toolkit";

const initState = {
  update: false,
};

const selectedUpdateReducer = createSlice({
  name: "selectedUpdate",
  initialState: initState,
  reducers: {
    setSelectedUpdate: (state) => (state = !state),
  },
});

export const { setSelectedUpdate } = selectedUpdateReducer.actions;

export default selectedUpdateReducer;
