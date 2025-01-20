import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import io from "socket.io-client";
// ... your chart component import
import { lttb } from "./lttb"; // Assuming you saved lttb.js in the same directory or adjusted path

function StockChart() {
  const [stockData, setStockData] = useState([]);
  const dataBufferSize = 60 * 60;
  const chartDataPointsThreshold = 500; // Target points for chart

  useEffect(() => {
    const socket = io("YOUR_SOCKET_IO_ENDPOINT");

    socket.on("stockUpdate", (price) => {
      const timestamp = Date.now(); // Or use server timestamp if provided
      setStockData((prevData) => {
        const newDataPoint = { x: timestamp, y: price };
        const newData = [...prevData, newDataPoint];
        if (newData.length > dataBufferSize) {
          newData.shift(); // Remove oldest
        }
        return newData;
      });
    });

    return () => socket.disconnect();
  }, []);

  // Decimate data before rendering the chart
  const decimatedStockData = useMemo(() => {
    if (stockData.length > chartDataPointsThreshold) {
      return lttb(stockData, chartDataPointsThreshold);
    }
    return stockData; // No decimation needed if data is already below threshold
  }, [stockData, chartDataPointsThreshold]);

  return (
    <div>
      {/* ... other components */}
      <PriceChart chartData={decimatedStockData} />
    </div>
  );
}

// PriceChart component (memoized as before)
const PriceChart = memo(({ chartData }) => {
  // ... chart rendering using chartData (e.g., with Chart.js, Highcharts, etc.)
});

export default StockChart;
