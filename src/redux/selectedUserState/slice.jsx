import { createSlice } from "@reduxjs/toolkit";

const selectedUserStateReducer = createSlice({
  name: "selectedUserState",
  initialState: false,
  reducers: {
    setSelectedUserState: (state, action) => action.payload,
  },
});

export const { setSelectedUserState } = selectedUserStateReducer.actions;

export default selectedUserStateReducer;
