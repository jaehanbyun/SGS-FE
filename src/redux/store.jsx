import { configureStore } from "@reduxjs/toolkit";
import selectedChannelReducer from "./selectedChannel/slice";
import selectedProfileIconReducer from "./selectedProfileIcon/slice";
import selectedUserStateReducer from "./selectedUserState/slice";
import selectedUserInfoReducer from "./selectedUserInfo/slice";
import selectedRoomInfoReducer from "./selectedRoomInfo/slice";
import selectedUpdateReducer from "./selectedUpdate/slice";

const store = configureStore({
  reducer: {
    selectedChannel: selectedChannelReducer.reducer,
    selectedProfileIcon: selectedProfileIconReducer.reducer,
    selectedUserState: selectedUserStateReducer.reducer,
    selectedUserInfo: selectedUserInfoReducer.reducer,
    selectedRoomInfo: selectedRoomInfoReducer.reducer,
    selectedUpdate: selectedUpdateReducer.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
