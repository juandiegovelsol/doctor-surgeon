import React from "react";
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

function ResponseCodeChartComponent({ responseCodes }) {
  const labels = Object.keys(responseCodes);
  const dataValues = Object.values(responseCodes);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Response Codes",
        data: dataValues,
        backgroundColor: labels.map((code) => {
          const codeNum = parseInt(code);
          if (codeNum >= 200 && codeNum < 300) return "green";
          if (codeNum >= 300 && codeNum < 400) return "blue";
          if (codeNum >= 400 && codeNum < 500) return "red";
          return "gray";
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Response Code Distribution",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0, // Ensure y-axis labels are integers
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}

export default ResponseCodeChartComponent;
