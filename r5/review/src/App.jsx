import React, { useState } from "react";
import BarChart from "./BarChart";

const App = () => {
  const [chartData, setChartData] = useState([
    { name: "A", value: 10, category: "X" },
    { name: "B", value: 15, category: "Y" },
    { name: "C", value: 8, category: "X" },
    { name: "D", value: 20, category: "Y" },
  ]);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFilterChange("category", "X")}>
          Show Category X
        </button>
        <button onClick={() => handleFilterChange("category", "Y")}>
          Show Category Y
        </button>
        <button onClick={() => setFilters({})}>Show All</button>
      </div>
      <BarChart data={chartData} filters={filters} />
    </div>
  );
};

export default App;
