// PieChartContainer.jsx
import React from "react";
import PieChart from "./PieChart";
import DataList from "./DataList";

// Function to generate a random HEX color
const getRandomHexColor = () => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex.padStart(6, "0")}`; // Pad with leading zeros if necessary and prepend '#'
};

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
  },
};

const PieChartContainer = () => {
  const rawDataSingle = [{ name: "Single DP", value: 100 }];

  // Add random color to each data item
  const dataSingle = rawDataSingle.map((item) => ({
    ...item,
    color: getRandomHexColor(),
  }));

  return (
    <div style={styles.content}>
      <h3>Single Data Point (100%)</h3>
      <PieChart data={dataSingle} width={300} height={300} />
      {/* You can conditionally render DataList if needed, or remove it for this single chart example */}
      {/* <DataList data={dataSingle} /> */}
    </div>
  );
};

export default PieChartContainer;
