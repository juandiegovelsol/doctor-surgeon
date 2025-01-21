import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

const RealTimeECharts = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataQueue, setDataQueue] = useState([]);

  useEffect(() => {
    const chartDom = chartRef.current;
    const instance = echarts.init(chartDom);
    setChartInstance(instance);

    // Initial chart options (minimal data)
    instance.setOption({
      xAxis: {
        type: "time",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          data: [], // Start with no data
        },
      ],
    });

    return () => {
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance) return;

    // Simulate receiving real-time data (replace with your actual data source)
    const intervalId = setInterval(() => {
      const newDataPoint = {
        name: new Date().toLocaleTimeString(),
        value: Math.random() * 100,
      };
      setDataQueue((prevQueue) => [...prevQueue, newDataPoint]);
    }, 1000); // Simulate data every 1 second

    return () => clearInterval(intervalId);
  }, [chartInstance]);

  useEffect(() => {
    if (!chartInstance || dataQueue.length === 0) return;

    // Append new data to the chart incrementally
    const newData = dataQueue.map((item) => [item.name, item.value]);

    chartInstance.appendData({
      seriesIndex: 0,
      data: newData,
    });

    // Clear the queue after appending
    setDataQueue([]);
  }, [chartInstance, dataQueue]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default RealTimeECharts;
