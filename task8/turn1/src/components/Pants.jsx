// src/components/Pants.jsx
import React from "react";
import ProductItem from "./ProductItem";

const Pants = () => {
  const pantsProducts = [
    { id: 4, name: "Jeans", price: 60 },
    { id: 5, name: "Trousers", price: 70 },
    { id: 6, name: "Shorts", price: 30 },
  ];

  return (
    <div>
      <h2>Pants</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {pantsProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Pants;
