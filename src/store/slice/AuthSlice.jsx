import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state with user token and role
const initialState = {
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
  success: false,
};

// Thunk for signup
export const signup = createAsyncThunk('auth/signup', async (user) => {
  try {
    const response = await axios.post('http://localhost:3000/signup', user);
    return response.data;
  } catch (error) {
    return console.log(error);
  }
});

// Thunk for signIn
export const signIn = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('http://localhost:3000/signin', credentials);
  return response.data; // Assuming the response contains user data and role
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Store user data
        state.token = action.payload.token; // Store token
        state.role = action.payload.role; // Store user role
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;