import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async () => {
  const response = await axios.get('/api/user/profile');
  return response.data;
});

export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async ({ id, data }) => {
  const response = await axios.put(`/api/user/profile/${id}`, data);
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;