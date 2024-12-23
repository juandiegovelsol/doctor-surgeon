// src/App.jsx
import React, { useState } from "react";
import DishList from "./components/DishList";
import ShoppingCart from "./components/ShoppingCart";
import OrderList from "./components/OrderList";

const initialDishes = [
  { id: 1, name: "Pizza", price: 10.99 },
  { id: 2, name: "Burger", price: 7.5 },
  { id: 3, name: "Salad", price: 5.25 },
  { id: 4, name: "Pasta", price: 9.0 },
];

function App() {
  const [dishes] = useState(initialDishes);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleBuy = () => {
    if (cart.length > 0) {
      const newOrder = {
        id: Date.now(), // Simple way to generate a unique ID
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
        })),
        totalPrice: cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
      setOrders([...orders, newOrder]);
      setCart([]);
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div>
      <h1>Restaurant Order</h1>
      <DishList dishes={dishes} cart={cart} setCart={setCart} />
      <ShoppingCart cart={cart} onBuy={handleBuy} />
      <OrderList orders={orders} />
    </div>
  );
}

export default App;
