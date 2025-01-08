// src/components/ProductCard.jsx
import React from "react";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">{product.price}</p>
      <p className="description">{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
