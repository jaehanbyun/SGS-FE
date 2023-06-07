import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userId: null,
  roomType: null,
  roomId: null,
  roomName: "",
  maxUser: null,
  roomChannel: "",
};

const selectedRoomInfoReducer = createSlice({
  name: "selectedRoomInfo",
  initialState: initState,
  reducers: {
    setSelectedRoomInfo: (
      state,
      { payload: { userId, roomType, roomId, roomName, maxUser, roomChannel } }
    ) => ({
      ...state,
      userId,
      roomType,
      roomId,
      roomName,
      maxUser,
      roomChannel,
    }),
  },
});

export const { setSelectedRoomInfo } = selectedRoomInfoReducer.actions;

export default selectedRoomInfoReducer;
