// ProductCard.js
import React from "react";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(product);
    alert(`Added ${product.name} to cart!`); // Optional feedback
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: \( \){product.price.toFixed(2)}\( \)</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
