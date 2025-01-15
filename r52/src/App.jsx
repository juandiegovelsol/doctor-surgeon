import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CartSummary from "./CartSummary";
import ProductCard from "./ProductCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CartSummary />
      <ProductCard />
    </>
  );
}

export default App;
