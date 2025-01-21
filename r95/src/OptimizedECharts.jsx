import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

const OptimizedECharts = ({ rawData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const chartInstance = echarts.init(chartDom);

    // 1. Data Downsampling
    const seriesData = rawData.map((item) => [item.timestamp, item.value]);

    const option = {
      xAxis: {
        type: "time",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          data: seriesData,
          // 2. Enable Data Downsampling (using 'lttb' - Largest-Triangle-Three-Buckets)
          sampling: "lttb",
          // 3. Consider `large` for massive datasets
          // large: true, // Uncomment if dealing with tens of thousands of points
          // 4. Adjust symbol size
          symbolSize: 0, // Hide individual data points initially
          hoverAnimation: true, // Keep hover effect
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [rawData]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default OptimizedECharts;
