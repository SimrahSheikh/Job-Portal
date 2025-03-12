import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for HR signup
export const appliedJob = createAsyncThunk('user/appliedJob', async (userData) => {
    try {
        const response = await axios.get('http://localhost:3000/hr/profile/appliedjobs/myjob');
        return response.data;
    } catch (error) {
        throw error;
    }
});