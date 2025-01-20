// App.js or index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FeedbackProvider } from "./FeedbackContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FeedbackProvider>
      <App />
    </FeedbackProvider>
  </React.StrictMode>
);
