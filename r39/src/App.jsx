import React from "react";
import BarChart from "./BarChart";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>Multiple Bar Charts</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <BarChart colored={true} sortable={true} customizable={false} />
        <BarChart colored={true} sortable={false} customizable={false} />
        <BarChart colored={false} sortable={true} customizable={false} />
        <BarChart colored={false} sortable={false} customizable={false} />
        <BarChart colored={true} sortable={true} customizable={true} />{" "}
        {/* Customizable, defaults to colored and sortable */}
        <BarChart colored={false} sortable={false} customizable={true} />{" "}
        {/* Customizable, defaults to not colored and not sortable */}
      </div>
    </div>
  );
}

export default App;
