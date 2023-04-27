import { createSlice } from "@reduxjs/toolkit";

const initState = {
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
      { payload: { name, email, profileImage, studyTime, description } }
    ) => ({
      name,
      email,
      profileImage,
      studyTime,
      description,
    }),
  },
});

export const { setSelectedUserInfo } = selectedUserInfoReducer.actions;

export default selectedUserInfoReducer;
