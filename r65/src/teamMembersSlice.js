// teamMembersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamMembers: [
    { id: "user1", name: "Alice Smith", email: "alice@example.com" },
    { id: "user2", name: "Bob Johnson", email: "bob@example.com" },
    { id: "user3", name: "Charlie Brown", email: "charlie@example.com" },
  ],
};

const teamMembersSlice = createSlice({
  name: "teamMembers",
  initialState,
  reducers: {
    addTeamMember: (state, action) => {
      state.teamMembers.push(action.payload);
    },
    // You can add reducers to manage team members if needed (e.g., delete, update)
  },
});

export const { addTeamMember } = teamMembersSlice.actions;

// Selectors
export const selectTeamMembers = (state) => state.teamMembers.teamMembers;
export const selectTeamMemberById = (state, memberId) =>
  state.teamMembers.teamMembers.find((member) => member.id === memberId);

export default teamMembersSlice.reducer;
