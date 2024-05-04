import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, user) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/orders/add/",
        order,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
);

const initialState = {
  order: {},
  isLoading: false,
  isError: false,
  success: false,
  error: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.success = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
