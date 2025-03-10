import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for HR signup
export const signupHR = createAsyncThunk('auth/signupHR', async (userData) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/signup/hr', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Thunk for User signup
export const signupUser = createAsyncThunk('auth/signupUser', async (userData) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/signup/user', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Thunk for signIn
export const signIn = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('http://localhost:3000/signin', credentials);
    return response.data; // Assuming the response contains user data and role
});

// Initial state with user token and role
const initialState = {
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
  success: false,
};

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
            .addCase(signupHR.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupHR.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Store user data
            })
            .addCase(signupHR.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Store user data
            })
            .addCase(signupUser.rejected, (state, action) => {
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