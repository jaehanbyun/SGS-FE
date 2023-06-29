import { createSlice } from "@reduxjs/toolkit";

const initState = {
  client: null,
  master: true,
  id: "",
  name: "",
  email: "",
  profileImage: null,
  description: "",
};

const selectedUserInfoReducer = createSlice({
  name: "selectedUserInfo",
  initialState: initState,
  reducers: {
    setSelectedUserInfo: (
      state,
      {
        payload: { client, master, id, name, email, profileImage, description },
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
    }),
  },
});

export const { setSelectedUserInfo } = selectedUserInfoReducer.actions;

export default selectedUserInfoReducer;
