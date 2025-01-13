import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({
  colored: propColored,
  sortable: propSortable,
  customizable,
}) {
  const [inputValue, setInputValue] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [isColored, setIsColored] = useState(propColored);
  const [isSortable, setIsSortable] = useState(propSortable);

  useEffect(() => {
    if (!customizable) {
      setIsColored(propColored);
      setIsSortable(propSortable);
    }

    // Generate initial random data
    const initialValues = generateRandomData();
    setInputValue(initialValues.join(", "));
    updateChart(initialValues);
  }, [customizable, propColored, propSortable]); // useEffect dependency array

  const generateRandomData = () => {
    const numBars = Math.floor(Math.random() * 16) + 5; // Random number of bars between 5 and 20 (inclusive)
    const randomValues = Array.from(
      { length: numBars },
      () => Math.floor(Math.random() * 100) + 1
    ); // Random values between 1 and 100
    return randomValues;
  };

  const parseInputValues = (inputString) => {
    const values = inputString
      .split(",")
      .map((str) => parseInt(str.trim(), 10));
    return values;
  };

  const validateValues = (values) => {
    for (const val of values) {
      if (isNaN(val)) {
        alert("Input values must be integers.");
        return false;
      }
      if (val <= 0 || val > 100) {
        alert("Individual values must be between 1 and 100.");
        return false;
      }
    }
    return true;
  };

  const getColor = (value) => {
    if (customizable) {
      if (!isColored) {
        return "blue";
      }
    } else {
      if (!propColored) {
        return "blue";
      }
    }

    if (value >= 1 && value <= 5) {
      return "green";
    } else if (value >= 6 && value <= 14) {
      return "yellow";
    } else if (value >= 15 && value <= 24) {
      return "orange";
    } else {
      return "red";
    }
  };

  const updateChart = (values) => {
    if (!validateValues(values)) {
      return;
    }

    const labels = values.map((value) => String(value));
    const backgroundColors = values.map((value) => getColor(value));

    setChartData({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    });
  };

  const handleUpdateClick = () => {
    const values = parseInputValues(inputValue);
    updateChart(values);
  };

  const handleSortClick = () => {
    let values = parseInputValues(inputValue);
    if (!validateValues(values)) {
      return;
    }
    values.sort((a, b) => a - b);
    setInputValue(values.join(", "));
    updateChart(values);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Bar Chart of Input Values",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
        textAlign: "center",
      }}
    >
      <h3>
        {customizable
          ? "Customizable Chart"
          : `Colored: ${propColored ? "Yes" : "No"}, Sortable: ${
              propSortable ? "Yes" : "No"
            }`}
      </h3>

      {customizable && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <label style={{ marginRight: "15px" }}>
            <input
              type="checkbox"
              checked={isColored}
              onChange={(e) => setIsColored(e.target.checked)}
              style={{ marginRight: "5px" }}
            />
            Enable Coloring
          </label>
          <label>
            <input
              type="checkbox"
              checked={isSortable}
              onChange={(e) => setIsSortable(e.target.checked)}
              style={{ marginRight: "5px" }}
            />
            Enable Sorting
          </label>
        </div>
      )}

      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <Bar options={chartOptions} data={chartData} />
      </div>

      <input
        type="text"
        placeholder="Enter comma-separated integers"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button
          onClick={handleUpdateClick}
          style={{ padding: "10px 15px", marginRight: "5px" }}
        >
          Update
        </button>
        <button
          onClick={handleSortClick}
          style={{ padding: "10px 15px", marginLeft: "5px" }}
          disabled={customizable ? !isSortable : !propSortable}
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default BarChart;
