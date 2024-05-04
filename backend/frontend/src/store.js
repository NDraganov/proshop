import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import orderReducer from "./reducers/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});
