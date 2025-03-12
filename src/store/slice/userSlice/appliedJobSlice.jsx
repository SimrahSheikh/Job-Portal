import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';

// Thunk for HR signup
export const UserAppliedJob= createAsyncThunk('user/fetchAppliedJobs', async (userData) => {
    try {

        const cookies = new Cookies();
        const token = cookies.get("user-token") || localStorage.getItem("auth-token");
        const response = await axios.get('http://localhost:3000/user/profile/appliedjobs/myjob', {
            headers: {
                "authorization-user": 'Bearer ' + token,
            },
        })
        return response.data.appliedJobs;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    appliedJobs: [],
    loading: false,
    error: null,
}

const appliedJobSlice = createSlice({
    name: 'appliedJobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UserAppliedJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserAppliedJob.fulfilled, (state, action) => {
                state.loading = false;
                state.appliedJobs = action.payload;
            })
            .addCase(UserAppliedJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});
export default appliedJobSlice.reducer;