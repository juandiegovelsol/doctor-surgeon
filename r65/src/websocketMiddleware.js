// websocketMiddleware.js
import websocketService from "./websocketService";
import {
  realTimeTaskAdded,
  realTimeTaskUpdated,
  realTimeTaskDeleted,
} from "./tasksSlice";

const createWebSocketMiddleware = (wsUrl) => {
  return ({ dispatch }) => {
    websocketService
      .connect(wsUrl)
      .catch((error) => console.error("WebSocket connection failed:", error));

    websocketService.registerHandler("TASK_ADDED", (payload) => {
      dispatch(realTimeTaskAdded(payload));
    });

    websocketService.registerHandler("TASK_UPDATED", (payload) => {
      dispatch(realTimeTaskUpdated(payload));
    });

    websocketService.registerHandler("TASK_DELETED", (payload) => {
      dispatch(realTimeTaskDeleted(payload));
    });

    return (next) => (action) => {
      // You could potentially send actions to the WebSocket server from here if needed.
      // For example, if you want to sync certain Redux actions with the backend via WebSocket.
      // Example:
      // if (action.type === 'tasks/addTask') {
      //   websocketService.sendMessage({ type: 'ADD_TASK', payload: action.payload });
      // }

      return next(action); // Let actions continue through the middleware chain.
    };
  };
};

export default createWebSocketMiddleware;
