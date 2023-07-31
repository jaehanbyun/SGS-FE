import { createSlice } from "@reduxjs/toolkit";

const initState = {
  client: null,
  id: "",
  name: "",
  email: "",
  profileImage: null,
  studyTime: 0,
  description: "",
  url: "",
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
          url,
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
      url,
    }),
  },
});

export const { setSelectedUserInfo } = selectedUserInfoReducer.actions;

export default selectedUserInfoReducer;
