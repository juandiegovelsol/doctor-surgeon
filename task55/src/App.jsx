import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file

const productsData = [
  {
    title: "Laptop Pro X",
    description: "High-performance laptop for professionals.",
    image: "https://via.placeholder.com/150x100",
    price: 1299.99,
  },
  {
    title: "Ergonomic Mouse",
    description: "Comfortable mouse for extended use.",
    image: "https://via.placeholder.com/150x100",
    price: 29.99,
  },
  {
    title: "Mechanical Keyboard",
    description: "Responsive keyboard for fast typing and gaming.",
    image: "https://via.placeholder.com/150x100",
    price: 99.99,
  },
  {
    title: "Wireless Headphones",
    description: "Noise-cancelling headphones with great sound quality.",
    image: "https://via.placeholder.com/150x100",
    price: 149.99,
  },
  {
    title: "4K Monitor",
    description: "High-resolution monitor for crisp visuals.",
    image: "https://via.placeholder.com/150x100",
    price: 399.99,
  },
  {
    title: "Solid State Drive 1TB",
    description: "Fast storage solution for your data.",
    image: "https://via.placeholder.com/150x100",
    price: 179.99,
  },
  {
    title: "Webcam HD",
    description: "High-definition webcam for video conferencing.",
    image: "https://via.placeholder.com/150x100",
    price: 49.99,
  },
  {
    title: "Desk Lamp LED",
    description: "Energy-efficient LED desk lamp with adjustable brightness.",
    image: "https://via.placeholder.com/150x100",
    price: 34.99,
  },
  {
    title: "External Hard Drive 2TB",
    description: "Portable storage for backups and extra space.",
    image: "https://via.placeholder.com/150x100",
    price: 79.99,
  },
  {
    title: "USB Hub",
    description: "Expand your USB ports with this convenient hub.",
    image: "https://via.placeholder.com/150x100",
    price: 19.99,
  },
];

const ProductCard = ({ product, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(product.title);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: \\( ${product.price.toFixed(2)} \\)</p>
      <button>Add to Cart</button>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState(productsData);
  const [hoverCounts, setHoverCounts] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag for initial load

  useEffect(() => {
    // Load hover counts from local storage on initial mount
    const storedHoverCounts = localStorage.getItem("productHoverCounts");
    if (storedHoverCounts) {
      setHoverCounts(JSON.parse(storedHoverCounts));
    }
    setIsInitialLoad(false); // Set initial load flag to false after loading from local storage
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      // Sort products only after the initial load is complete
      console.log("ORDERED");
      const sortedProducts = [...products].sort((a, b) => {
        const countA = hoverCounts[a.title] || 0;
        const countB = hoverCounts[b.title] || 0;
        return countB - countA;
      });
      setProducts(sortedProducts);
    }
  }, [hoverCounts, isInitialLoad]); // Re-sort only when hoverCounts or initialLoad changes

  useEffect(() => {
    // Save hover counts to local storage when component unmounts

    return () => {
      console.log("LocalStorage CLEARED", hoverCounts);
      localStorage.setItem("productHoverCounts", JSON.stringify(hoverCounts));
    };
  }, []); // Only re-run if hoverCounts changes (for efficiency, although it's fine to include/exclude here)

  const handleProductHover = (productTitle) => {
    setHoverCounts((prevCounts) => {
      return {
        ...prevCounts,
        [productTitle]: (prevCounts[productTitle] || 0) + 1,
      };
    });
  };

  return (
    <div className="app-container">
      <h1>Adaptative Online Store</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            onHover={handleProductHover}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
