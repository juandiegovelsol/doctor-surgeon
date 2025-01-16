// src/App.jsx
import React from "react";
import Menu from "./components/Menu";
import Content from "./components/Content";
import "./App.scss";

function App() {
  const clientsData = [
    {
      id: "CLIENT001",
      name: "Alpha Corp",
      location: "New York",
      phone: "123-456-7890",
      isTrusted: true,
    },
    {
      id: "CLIENT002",
      name: "Beta Industries",
      location: "Los Angeles",
      phone: "987-654-3210",
      isTrusted: false,
    },
    {
      id: "CLIENT003",
      name: "Gamma Solutions",
      location: "Chicago",
      phone: "555-123-4567",
      isTrusted: true,
    },
    {
      id: "CLIENT004",
      name: "Delta Systems",
      location: "Houston",
      phone: "111-222-3333",
      isTrusted: true,
    },
    {
      id: "CLIENT005",
      name: "Epsilon Group",
      location: "Phoenix",
      phone: "444-555-6666",
      isTrusted: false,
    },
    {
      id: "CLIENT006",
      name: "Zeta Corp",
      location: "Philadelphia",
      phone: "777-888-9999",
      isTrusted: true,
    },
    {
      id: "CLIENT007",
      name: "Eta Industries",
      location: "San Antonio",
      phone: "333-222-1111",
      isTrusted: false,
    },
    {
      id: "CLIENT008",
      name: "Theta Solutions",
      location: "San Diego",
      phone: "666-777-8888",
      isTrusted: true,
    },
    {
      id: "CLIENT009",
      name: "Iota Systems",
      location: "Dallas",
      phone: "999-000-1111",
      isTrusted: false,
    },
    {
      id: "CLIENT010",
      name: "Kappa Group",
      location: "San Jose",
      phone: "121-313-4141",
      isTrusted: true,
    },
  ];

  return (
    <div className="app-container">
      <Menu />
      <Content clients={clientsData} />
    </div>
  );
}

export default App;
