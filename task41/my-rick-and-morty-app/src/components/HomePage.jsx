// src/components/HomePage.jsx
import React from "react";
import NavBar from "./NavBar";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Welcome to the Rick and Morty API Explorer</h1>
      <p>Explore the available resources through the navigation bar.</p>
    </div>
  );
};

export default HomePage;
