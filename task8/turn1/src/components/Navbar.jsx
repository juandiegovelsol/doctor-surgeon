// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/shoes">Shoes</Link>
        </li>
        <li>
          <Link to="/pants">Pants</Link>
        </li>
        <li>
          <Link to="/shirts">Shirts</Link>
        </li>
        <li>
          <Link to="/hats">Hats</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
