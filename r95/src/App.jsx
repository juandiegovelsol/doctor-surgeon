import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OptimizedChartJS from "./OptimizedChartJS";
import OptimizedECharts from "./OptimizedECharts";
import RealTimeECharts from "./RealTimeECharts";
import RealTimeEChartsDynamicQueueSize from "./RealTimeEChartsDynamicQueueSize";
import RealTimeEChartsDynamicTimeWindow from "./RealTimeEChartsDynamicTimeWindow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RealTimeEChartsDynamicQueueSize />
      <RealTimeEChartsDynamicTimeWindow />
    </>
  );
}

export default App;
