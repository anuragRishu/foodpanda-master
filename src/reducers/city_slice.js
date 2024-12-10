import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    cities: [],
  },
};
const CitySlice = createSlice({
  name: "cityList",
  initialState,
  reducers: {
    getCities: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { getCities } = CitySlice.actions;
export default CitySlice.reducer;
