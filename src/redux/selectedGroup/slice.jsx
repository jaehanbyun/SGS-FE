import { createSlice } from "@reduxjs/toolkit";

const selectedGroupReducer = createSlice({
  name: "selectedGroup",
  initialState: null,
  reducers: {
    setSelectedGroup: (state, action) => action.payload,
  },
});

export const { setSelectedGroup } = selectedGroupReducer.actions;

export default selectedGroupReducer;
