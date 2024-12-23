// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shoes from "./components/Shoes";
import Pants from "./components/Pants";
import Shirts from "./components/Shirts";
import Hats from "./components/Hats";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/pants" element={<Pants />} />
            <Route path="/shirts" element={<Shirts />} />
            <Route path="/hats" element={<Hats />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Shoes />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
