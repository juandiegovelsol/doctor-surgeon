// src/components/CartSummary.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Cart Summary</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - \\( ${item.price} \\)
              </li>
            ))}
          </ul>
          <p>Total Price: \\( ${totalPrice} \\)</p>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
