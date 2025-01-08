import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { throttle } from "lodash";

const RealTimeStockChart = () => {
  const [stockData, setStockData] = useState([]);
  const chartRef = useRef(null); // Optional: To interact with the chart instance

  const handleNewData = (newDataPoint) => {
    setStockData((prevData) => {
      const newData = [...prevData, newDataPoint];
      const maxDataPoints = 500;
      return newData.slice(-maxDataPoints);
    });
  };

  const throttledHandleNewData = useRef(throttle(handleNewData, 100));

  const fetchNewData = () => {
    const newPrice = Math.random() * (100 + stockData.length) + 50;
    const newTime = new Date();
    const newDataPoint = {
      time: newTime.toLocaleTimeString(),
      price: newPrice.toFixed(2),
    };
    throttledHandleNewData.current(newDataPoint);
  };

  useEffect(() => {
    const intervalId = setInterval(fetchNewData, 100); // Fetch data more frequently
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stockData} ref={chartRef}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealTimeStockChart;
