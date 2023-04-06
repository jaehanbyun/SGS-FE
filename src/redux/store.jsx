import { configureStore } from "@reduxjs/toolkit";
import selectedChannelReducer from "./selectedChannel/slice";
import selectedProfileIconReducer from "./selectedProfileIcon/slice";

const store = configureStore({
  reducer: {
    selectedChannel: selectedChannelReducer.reducer,
    selectedProfileIcon: selectedProfileIconReducer.reducer,
  },
});

export default store;
