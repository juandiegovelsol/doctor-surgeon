// src/components/Shirts.jsx
import React from "react";
import ProductItem from "./ProductItem";

const Shirts = () => {
  const shirtsProducts = [
    { id: 7, name: "T-Shirt", price: 25 },
    { id: 8, name: "Dress Shirt", price: 45 },
    { id: 9, name: "Sweater", price: 55 },
  ];

  return (
    <div>
      <h2>Shirts</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {shirtsProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shirts;
