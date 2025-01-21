// RelatedProducts.js
import React, { useState } from "react";
import "./RelatedProducts.css";

const RelatedProducts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`related-products ${isExpanded ? "expanded" : ""}`}>
      <h2 onClick={toggleExpand} style={{ cursor: "pointer" }}>
        Related Items {isExpanded ? "▲" : "▼"}
      </h2>
      <ul style={{ display: isExpanded ? "block" : "none" }}>
        <li>Related Product 1</li>
        <li>Related Product 2</li>
        {/* ... more items */}
      </ul>
    </div>
  );
};

export default RelatedProducts;
