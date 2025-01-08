// src/redux/reducers/invitationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/invitations"; // Adjust if your API is different

export const fetchInvitations = createAsyncThunk(
  "invitations/fetchInvitations",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const createInvitation = createAsyncThunk(
  "invitations/createInvitation",
  async (invitationData) => {
    const response = await axios.post(API_URL, invitationData);
    return response.data;
  }
);

export const updateInvitationStatus = createAsyncThunk(
  "invitations/updateInvitationStatus",
  async ({ code, invitationName, isAccepted }) => {
    const response = await axios.put(`${API_URL}/${code}`, {
      invitationName,
      isAccepted,
    });
    return response.data;
  }
);

export const fetchWeddingSummary = createAsyncThunk(
  "invitations/fetchWeddingSummary",
  async () => {
    const response = await axios.get(`${API_URL}/summary`);
    return response.data;
  }
);

const invitationSlice = createSlice({
  name: "invitations",
  initialState: {
    invitations: [],
    loading: false,
    error: null,
    isAdmin: false,
    availableInvitationNames: [],
    summary: null,
    loadingSummary: false,
    errorSummary: null,
  },
  reducers: {
    setAdminMode: (state, action) => {
      state.isAdmin = action.payload;
    },
    setAvailableInvitationNames: (state, action) => {
      state.availableInvitationNames = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload;
        // Extract available invitation names on successful fetch
        const names = [
          ...new Set(action.payload.map((inv) => inv.invitationName)),
        ];
        state.availableInvitationNames = names;
      })
      .addCase(fetchInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations.push(action.payload);
      })
      .addCase(createInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateInvitationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvitationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = state.invitations.map((invitation) =>
          invitation.code === action.payload.code &&
          invitation.invitationName === action.payload.invitationName
            ? action.payload
            : invitation
        );
      })
      .addCase(updateInvitationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWeddingSummary.pending, (state) => {
        state.loadingSummary = true;
        state.errorSummary = null;
      })
      .addCase(fetchWeddingSummary.fulfilled, (state, action) => {
        state.loadingSummary = false;
        state.summary = action.payload;
      })
      .addCase(fetchWeddingSummary.rejected, (state, action) => {
        state.loadingSummary = false;
        state.errorSummary = action.error.message;
      });
  },
});

export const { setAdminMode, setAvailableInvitationNames } =
  invitationSlice.actions;
export default invitationSlice.reducer;
