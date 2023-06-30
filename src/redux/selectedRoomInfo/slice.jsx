import { createSlice } from "@reduxjs/toolkit";

const initState = {
  roomId: null,
};

const selectedRoomInfoReducer = createSlice({
  name: "selectedRoomInfo",
  initialState: initState,
  reducers: {
    setSelectedRoomInfo: (state, { payload: { roomId } }) => ({
      ...state,
      roomId,
    }),
  },
});

export const { setSelectedRoomInfo } = selectedRoomInfoReducer.actions;

export default selectedRoomInfoReducer;
