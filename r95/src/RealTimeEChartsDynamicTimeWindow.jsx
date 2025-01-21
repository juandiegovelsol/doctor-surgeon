import React, { useRef, useEffect, useState, useCallback } from "react";
import * as echarts from "echarts";

const RealTimeEChartsDynamicTimeWindow = ({
  initialTimeWindowSeconds = 60,
}) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataQueue, setDataQueue] = useState([]);
  const [timeWindowSeconds, setTimeWindowSeconds] = useState(
    initialTimeWindowSeconds
  );

  useEffect(() => {
    const chartDom = chartRef.current;
    const instance = echarts.init(chartDom);
    setChartInstance(instance);

    instance.setOption({
      xAxis: { type: "time" },
      yAxis: { type: "value" },
      series: [{ type: "line", data: [] }],
    });

    return () => instance.dispose();
  }, []);

  useEffect(() => {
    if (!chartInstance) return;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const newDataPoint = { timestamp: now, value: Math.random() * 100 };
      setDataQueue((prevQueue) => {
        const updatedQueue = [...prevQueue, newDataPoint];
        const cutoffTime = now - timeWindowSeconds * 1000;
        return updatedQueue.filter((item) => item.timestamp >= cutoffTime);
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [chartInstance, timeWindowSeconds]); // Re-run effect when timeWindowSeconds changes

  useEffect(() => {
    if (!chartInstance || dataQueue.length === 0) return;
    const newData = dataQueue.map((item) => [
      new Date(item.timestamp).toLocaleTimeString(),
      item.value,
    ]);
    chartInstance.setOption({ series: [{ data: newData }] });
  }, [chartInstance, dataQueue]);

  const handleTimeWindowSecondsChange = useCallback((event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      setTimeWindowSeconds(newValue);
    }
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="timeWindowSeconds">Time Window (seconds):</label>
        <input
          type="number"
          id="timeWindowSeconds"
          value={timeWindowSeconds}
          onChange={handleTimeWindowSecondsChange}
        />
      </div>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default RealTimeEChartsDynamicTimeWindow;
