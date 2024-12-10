import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: { list: [] },
};
const StateSlice = createSlice({
  name: "stateList",
 initialState,
  reducers: {
    getState: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { getState } = StateSlice.actions;
export default StateSlice.reducer;
