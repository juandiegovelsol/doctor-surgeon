// src/components/ProductItem.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductItem = ({ product }) => {
  const { addItem } = useContext(CartContext);

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}
    >
      <h3>{product.name}</h3>
      <p>Price: \\( ${product.price} \\)</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
