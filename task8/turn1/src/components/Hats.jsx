// src/components/Hats.jsx
import React from "react";
import ProductItem from "./ProductItem";

const Hats = () => {
  const hatsProducts = [
    { id: 10, name: "Baseball Cap", price: 20 },
    { id: 11, name: "Beanie", price: 25 },
    { id: 12, name: "Fedora", price: 35 },
  ];

  return (
    <div>
      <h2>Hats</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {hatsProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Hats;
