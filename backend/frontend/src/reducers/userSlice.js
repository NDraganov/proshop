import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        { username: email, password: password }
      );

      return data;
    } catch (error) {
      return error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        { name: name, email: email, password: password }
      );

      return data;
    } catch (error) {
      return error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async (id, user) => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return data;
  } catch (error) {
    return error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  try {
    const { data } = await axios.put(
      "http://127.0.0.1:8000/api/users/profile/update/",
      user,
      {
        headers: {
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
});

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  error: "",
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserDetails(state) {
      const userInfoFromStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      state.user = userInfoFromStorage;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    // Get User
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { getUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
