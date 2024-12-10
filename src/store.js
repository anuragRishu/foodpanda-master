import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./reducers/add_to_cart_slice";
import CategorySlice from "./reducers/categori_slice";
import CitySlice from "./reducers/city_slice";
import StateSlice from "./reducers/state_slice";
import UserSlice from "./reducers/user_slice";

export default configureStore({
  reducer: {
    user: UserSlice,
    stateList: StateSlice,
    cityList: CitySlice,
    cart: CartSlice,
    category: CategorySlice,
  },
});
