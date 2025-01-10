// App.js or your main component
import React from "react";
import StackedAreaChart from "./StackedAreaChart";
import { sampleData, productCategories, dateColumnName } from "./data"; // Assuming your data is in data.js

function App() {
  return (
    <div className="App">
      <h1>Revenue Breakdown</h1>
      <StackedAreaChart
        data={sampleData}
        categories={productCategories}
        dateColumn={dateColumnName}
        valueColumnPrefix="category" // Optional, could be removed if categories array is directly passed
      />
    </div>
  );
}

export default App;
