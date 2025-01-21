import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SSEActivity from "./components/SSEActivity";
import RealTimeActivity from "./components/RealTimeActivity";

function App() {
  return (
    <>
      <RealTimeActivity />
    </>
  );
}

export default App;
