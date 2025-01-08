// src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <section className="products-container">
      <div
        id="products"
        style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
