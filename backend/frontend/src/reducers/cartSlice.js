import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, qty }) => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/products/${id}`
    );
    data.qty = qty;
    return data;
  }
);

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCartItems(state) {
      const cartItemsFromStorage = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
      state.cartItems = cartItemsFromStorage;
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    getShippingAddress(state) {
      const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {};
      state.shippingAddress = shippingAddressFromStorage;
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
    getPaymentMethod(state) {
      const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
        ? JSON.parse(localStorage.getItem("paymentMethod"))
        : "";
      state.paymentMethod = paymentMethodFromStorage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;

      const item = action.payload;
      item.qty = action.payload.qty;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems.map((x) => (x._id === existItem._id ? item : x));
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.error = "Request failed with status code 404!";
    });
  },
});

export const {
  getCartItems,
  removeCartItem,
  saveShippingAddress,
  getShippingAddress,
  savePaymentMethod,
  getPaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
