import { createSlice } from "@reduxjs/toolkit";

const init = [false, false, false, false];

const selectedProfileIconReducer = createSlice({
  name: "selectedProfileIcon",
  initialState: init,
  reducers: {
    onSelectedProfileIcon: (state, { payload: index }) => {
      state = state.map((item, i) => (i === index ? !item : item));
      return state;
    },
    offSelectedProfileIcon: (state) => init,
  },
});

export const { onSelectedProfileIcon, offSelectedProfileIcon } =
  selectedProfileIconReducer.actions;

export default selectedProfileIconReducer;
