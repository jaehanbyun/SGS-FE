import { createSlice } from "@reduxjs/toolkit";

const initState = {
  client: null,
  master: "",
  id: "",
  name: "",
  email: "",
  profileImage: null,
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
          master,
          id,
          name,
          email,
          profileImage,
          description,
          url,
        },
      }
    ) => ({
      ...state,
      client,
      master,
      id,
      name,
      email,
      profileImage,
      description,
      url,
    }),
  },
});

export const { setSelectedUserInfo } = selectedUserInfoReducer.actions;

export default selectedUserInfoReducer;
