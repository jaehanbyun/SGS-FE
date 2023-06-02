import { createSlice } from "@reduxjs/toolkit";

const initState = {
  id: "",
  name: "",
  email: "",
  profileImage: null,
  studyTime: 0,
  description: "",
};

const selectedUserInfoReducer = createSlice({
  name: "selectedUserInfo",
  initialState: initState,
  reducers: {
    setSelectedUserInfo: (
      state,
      { payload: { id, name, email, profileImage, studyTime, description } }
    ) => ({ ...state, id, name, email, profileImage, studyTime, description }),
  },
});

export const { setSelectedUserInfo } = selectedUserInfoReducer.actions;

export default selectedUserInfoReducer;
