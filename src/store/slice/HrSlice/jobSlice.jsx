// post new job 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  jobs: [],
  loading: false,
  error: null,
};
// Async Thunk for posting job
export const postJob = createAsyncThunk(
  "jobs/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:3000/hr/postjob", jobData, {
        headers: {
          "Content-Type": "application/json",
          "authorization-user": `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to post job");
    }
  }
);

// Slice
const jobSlice = createSlice({
  name: "hrJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
