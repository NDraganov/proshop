import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
    return data;
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id) => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/products/${id}`
    );
    return data;
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  success: false,
  products: [],
  product: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all products
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.error = "Request failed with status code 404!";
    });

    // Get product details
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.error = "Request failed with status code 404!";
    });
  },
});

export default productsSlice.reducer;
