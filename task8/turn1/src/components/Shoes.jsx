// src/components/Shoes.jsx
import React from "react";
import ProductItem from "./ProductItem";

const Shoes = () => {
  const shoesProducts = [
    { id: 1, name: "Sneakers", price: 50 },
    { id: 2, name: "Boots", price: 80 },
    { id: 3, name: "Sandals", price: 40 },
  ];

  return (
    <div>
      <h2>Shoes</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {shoesProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shoes;
