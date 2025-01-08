// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const [productsData] = useState([
    {
      image: "https://via.placeholder.com/150/FFD700/000000?Text=Product+1",
      title: "Awesome Gadget",
      price: "$19.99",
      description: "This is an awesome gadget that will make your life easier.",
    },
    {
      image: "https://via.placeholder.com/150/87CEFA/000000?Text=Product+2",
      title: "Cool Tech Item",
      price: "$49.99",
      description: "A cool tech item you definitely need in your collection.",
    },
    {
      image: "https://via.placeholder.com/150/98FB98/000000?Text=Product+3",
      title: "Useful Utility",
      price: "$29.99",
      description:
        "A very useful utility that can help you with everyday tasks.",
    },
    {
      image: "https://via.placeholder.com/150/FFA07A/000000?Text=Product+4",
      title: "Fancy Accessory",
      price: "$39.99",
      description: "A fancy accessory to complement your style.",
    },
    {
      image: "https://via.placeholder.com/150/DDA0DD/000000?Text=Product+5",
      title: "Essential Supply",
      price: "$9.99",
      description: "An essential supply that you will use regularly.",
    },
    {
      image: "https://via.placeholder.com/150/B0E0E6/000000?Text=Product+6",
      title: "Innovative Tool",
      price: "$59.99",
      description: "An innovative tool designed for modern needs.",
    },
  ]);

  return (
    <div>
      <Header />
      <main>
        <ProductList products={productsData} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
