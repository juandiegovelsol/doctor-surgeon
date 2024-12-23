// src/context/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => {
      const indexToRemove = prevItems.findIndex((item) => item.id === id);
      if (indexToRemove !== -1) {
        const newItems = [...prevItems];
        newItems.splice(indexToRemove, 1);
        return newItems;
      }
      return prevItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
