// src/components/DishList.jsx
import React from "react";

function DishList({ dishes, cart, setCart }) {
  const handleQuantityChange = (dishId, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);
    if (parsedQuantity >= 0) {
      setCart((prevCart) => {
        if (parsedQuantity > 0) {
          const existingItemIndex = prevCart.findIndex(
            (item) => item.id === dishId
          );
          if (existingItemIndex > -1) {
            const newCart = [...prevCart];
            newCart[existingItemIndex] = {
              ...newCart[existingItemIndex],
              quantity: parsedQuantity,
            };
            return newCart;
          } else {
            const dish = dishes.find((dish) => dish.id === dishId);
            return [...prevCart, { ...dish, quantity: parsedQuantity }];
          }
        } else {
          return prevCart.filter((item) => item.id !== dishId);
        }
      });
    }
  };

  return (
    <div>
      <h3>Menu</h3>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.name} - \\( {dish.price.toFixed(2)} \\)
            <input
              type="number"
              min="0"
              value={cart.find((item) => item.id === dish.id)?.quantity || 0}
              onChange={(e) => handleQuantityChange(dish.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DishList;
