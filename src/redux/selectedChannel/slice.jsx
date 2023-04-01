import { createSlice } from "@reduxjs/toolkit";

const selectedChannelReducer = createSlice({
  name: "selectedChannel",
  initialState: 0,
  reducers: {
    setSelectedChannel: (state, action) => action.payload,
  },
});

export const { setSelectedChannel } = selectedChannelReducer.actions;

export default selectedChannelReducer;
