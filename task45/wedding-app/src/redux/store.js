import { configureStore } from "@reduxjs/toolkit";
import invitationReducer from "./reducers/invitationSlice";

const store = configureStore({
  reducer: {
    invitations: invitationReducer,
  },
});

export default store;
