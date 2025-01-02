// src/store/apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://rickandmortyapi.com/api";

// Async Thunk for fetching API resources
export const fetchApiResources = createAsyncThunk(
  "api/fetchResources",
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }
);

// Redux Slice for API resources
const apiSlice = createSlice({
  name: "api",
  initialState: {
    resources: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiResources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(fetchApiResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
