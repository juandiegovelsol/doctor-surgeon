import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LTTBChart = ({ originalData, decimatedData, displayDecimated }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: originalData.map((d) => new Date(d.x).toLocaleTimeString()), // Time labels
    datasets: [
      {
        label: "Original Data",
        data: originalData.map((d) => d.y),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        hidden: displayDecimated, // Hide original if decimated is displayed
      },
      {
        label: "Decimated Data (LTTB)",
        data: decimatedData.map((d) => d.y),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
        hidden: !displayDecimated, // Hide decimated if original is displayed
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock Price Data",
      },
    },
    scales: {
      x: {
        type: "category", // Use category scale for time labels
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  return <Line ref={chartRef} data={chartData} options={chartOptions} />;
};

export default LTTBChart;
