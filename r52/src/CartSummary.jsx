import React from "react";
import { useCart } from "./CartContext";

const CartSummaryComponent = () => {
  // Renamed to avoid confusion with memoized version
  const {
    cartItems,
    totalPrice,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    updateItemQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span> - Quantity:
            <button onClick={() => decreaseItemQuantity(item.id)}>-</button>
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => updateItemQuantity(item.id, e.target.value)}
              style={{ width: "50px", textAlign: "center" }}
            />
            <button onClick={() => increaseItemQuantity(item.id)}>+</button>-
            Price: \( \){(item.price * item.quantity).toFixed(2)}\( \)
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Price: \( \){totalPrice.toFixed(2)}\( \)</p>
    </div>
  );
};

// Memoize the CartSummary component
const CartSummary = React.memo(CartSummaryComponent);

export default CartSummary;
