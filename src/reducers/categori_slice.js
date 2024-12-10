import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
  },
  reducers: {
    getCategory: (state, action) => {
      console.log(action.payload, "payload");
      state.categoryList = action.payload;
      console.log(state.categoryList, "categoryList");
    },
  },
});
export const { getCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
