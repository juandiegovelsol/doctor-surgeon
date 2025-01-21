import React, { useMemo } from "react";
import { Line } from "react-chartjs-2"; // Example using react-chartjs-2

const MemoizedLineChart = React.memo(({ data }) => {
  const chartData = useMemo(
    () => ({
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: "Data Points",
          data: data.map((item) => item.value),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    }),
    [data]
  ); // Re-calculate only when 'data' prop changes

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
    }),
    []
  );

  return <Line data={chartData} options={options} />;
});

export default MemoizedLineChart;
