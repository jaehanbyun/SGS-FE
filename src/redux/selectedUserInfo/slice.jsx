import { createSlice } from "@reduxjs/toolkit";

const initState = {
  client: null,
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
      {
        payload: {
          client,
          id,
          name,
          email,
          profileImage,
          studyTime,
          description,
        },
      }
    ) => ({
      ...state,
      client,
      id,
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
