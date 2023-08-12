import { createSlice } from "@reduxjs/toolkit";

const initState = {
  type: true,
};

const selectedRoomInfoReducer = createSlice({
  name: "selectedRoomInfo",
  initialState: initState,
  reducers: {
    setSelectedRoomInfo: (state, { payload: { type } }) => ({
      ...state,
      type,
    }),
  },
});

export const { setSelectedRoomInfo } = selectedRoomInfoReducer.actions;

export default selectedRoomInfoReducer;
