import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";

const OptimizedChartJS = ({ rawData }) => {
  // 1. Data Sampling/Aggregation (Example: Taking every nth data point)
  const sampledData = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];
    const sampleRate = Math.ceil(rawData.length / 100); // Aim for ~100 points
    return rawData.filter((_, index) => index % sampleRate === 0);
  }, [rawData]);

  // 2. Preparing Chart Data (Memoize for performance)
  const chartData = useMemo(() => {
    if (!sampledData || sampledData.length === 0) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: sampledData.map((item) => item.timestamp),
      datasets: [
        {
          label: "Value",
          data: sampledData.map((item) => item.value),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [sampledData]);

  // 3. Chart Options (Memoize for performance)
  const chartOptions = useMemo(() => {
    return {
      responsive: true, // Ensure responsiveness
      maintainAspectRatio: false, // Allows flexible height
      animation: {
        // Consider disabling or reducing animation duration
        duration: 500, // Adjust as needed
      },
      elements: {
        point: {
          radius: 0, // Reduce point radius for better performance with many points
          hoverRadius: 3, // Keep hover radius for interaction
        },
      },
    };
  }, []);

  return <Line data={chartData} options={chartOptions} />;
};

export default OptimizedChartJS;
