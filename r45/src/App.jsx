// App.jsx
import React from "react";
import PieChartContainer from "./PieChartContainer";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
};

const App = () => {
  return (
    <div style={styles.container}>
      <h1>Pie Chart with Data List</h1>
      <PieChartContainer />
    </div>
  );
};

export default App;
