import { configureStore } from "@reduxjs/toolkit";
import selectedChannelReducer from "./selectedChannel/slice";

const store = configureStore({
  reducer: {
    selectedChannel: selectedChannelReducer.reducer,
  },
});

export default store;
