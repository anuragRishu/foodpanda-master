import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { user_data: "" } };
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
     
      state.value = action.payload;
     
    },
    logout: (state) => {
     
      state.value = initialState.value;
    },
  },
});
export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
