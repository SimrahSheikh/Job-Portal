import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching all posts
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    try {
        const token = localStorage.getItem("auth-token");
        const response = await axios.get("http://localhost:3000/hr/getjobs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Initial state with posts, loading, and error
const initialState = {
    posts: [],
    loading: false,
    error: null,
};

// Post slice
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // No reducers for now
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default postSlice.reducer;