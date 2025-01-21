import React, { useRef, useEffect, useState, useCallback } from "react";
import * as echarts from "echarts";

const RealTimeEChartsDynamicQueueSize = ({ initialMaxQueueSize = 100 }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [dataQueue, setDataQueue] = useState([]);
  const [maxQueueSize, setMaxQueueSize] = useState(initialMaxQueueSize);

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
      const newDataPoint = {
        name: new Date().toLocaleTimeString(),
        value: Math.random() * 100,
      };
      setDataQueue((prevQueue) => {
        const updatedQueue = [...prevQueue, newDataPoint];
        if (updatedQueue.length > maxQueueSize) {
          updatedQueue.shift();
        }
        return updatedQueue;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [chartInstance, maxQueueSize]); // Re-run effect when maxQueueSize changes

  useEffect(() => {
    if (!chartInstance || dataQueue.length === 0) return;
    const newData = dataQueue.map((item) => [item.name, item.value]);
    chartInstance.setOption({ series: [{ data: newData }] });
  }, [chartInstance, dataQueue]);

  const handleMaxQueueSizeChange = useCallback((event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      setMaxQueueSize(newValue);
      // Optionally, trim the existing queue to the new size immediately
      setDataQueue((prevQueue) =>
        prevQueue.slice(Math.max(0, prevQueue.length - newValue))
      );
    }
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="maxQueueSize">Max Queue Size:</label>
        <input
          type="number"
          id="maxQueueSize"
          value={maxQueueSize}
          onChange={handleMaxQueueSizeChange}
        />
      </div>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default RealTimeEChartsDynamicQueueSize;
