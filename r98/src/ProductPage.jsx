// ProductPage.js
import React from "react";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import "./ProductPage.css";

const ProductPage = () => {
  return (
    <div className="product-page">
      <ProductDetails />
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
