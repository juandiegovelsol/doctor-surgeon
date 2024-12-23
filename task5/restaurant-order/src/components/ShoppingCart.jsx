
// src/components/ShoppingCart.jsx
import React from 'react';

function ShoppingCart({ cart, onBuy }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h3>Your Cart</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} - \\( {(item.price \* item.quantity).toFixed(2)} \\)
          </li>
        ))}
      </ul>
      <p>Total: \\( {totalPrice.toFixed(2)} \\)</p>
      <button onClick={onBuy}>Buy</button>
    </div>
  );
}

export default ShoppingCart;