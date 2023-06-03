import { configureStore } from "@reduxjs/toolkit";
import selectedChannelReducer from "./selectedChannel/slice";
import selectedProfileIconReducer from "./selectedProfileIcon/slice";
import selectedUserStateReducer from "./selectedUserState/slice";
import selectedUserInfoReducer from "./selectedUserInfo/slice";

const store = configureStore({
  reducer: {
    selectedChannel: selectedChannelReducer.reducer,
    selectedProfileIcon: selectedProfileIconReducer.reducer,
    selectedUserState: selectedUserStateReducer.reducer,
    selectedUserInfo: selectedUserInfoReducer.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
