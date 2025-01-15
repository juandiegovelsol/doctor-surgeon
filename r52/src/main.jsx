// App.js or index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./CartContext"; // Import CartProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      {" "}
      {/* Wrap your app with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

export default App;
