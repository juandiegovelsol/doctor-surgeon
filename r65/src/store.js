// store.js
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import teamMembersReducer from "./teamMembersSlice";
import createWebSocketMiddleware from "./websocketMiddleware";

const wsUrl = "http://localhost:8080"; // Replace with your WebSocket server URL

const websocketMiddleware = createWebSocketMiddleware(wsUrl);

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    teamMembers: teamMembersReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware), // Add websocket middleware
});

export default store;
