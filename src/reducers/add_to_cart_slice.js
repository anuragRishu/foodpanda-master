import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: "",
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});
export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
