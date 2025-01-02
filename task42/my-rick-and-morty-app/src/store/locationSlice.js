// src/store/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (url) => {
    return await fetchData(url);
  }
);

const locationSlice = createSlice({
  name: "locations",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
