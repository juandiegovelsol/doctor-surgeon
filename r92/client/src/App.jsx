import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import LTTBChart from "./components/LTTBChart";

function App() {
  const [originalStockData, setOriginalStockData] = useState([]);
  const [decimatedStockData, setDecimatedStockData] = useState([]);
  const [displayDecimated, setDisplayDecimated] = useState(true);
  const [rmse, setRMSE] = useState(null);
  const dataBufferSize = 60 * 60; // 1 hour buffer
  const chartDataPointsThreshold = 500; // Target decimated points
  const workerRef = useRef(null);

  // Function to generate synthetic stock data (for demonstration)
  const generateStockData = useCallback((count) => {
    const now = Date.now();
    let lastPrice = 100;
    const newData = [];
    for (let i = 0; i < count; i++) {
      lastPrice += (Math.random() - 0.5) * 2; // Random walk
      newData.push({ x: now + i * 1000, y: lastPrice });
    }
    return newData;
  }, []);

  useEffect(() => {
    // 🚀 Web Worker Setup and Communication 🚀
    // 1. Create a Worker instance:
    //    - `new Worker()` creates a new worker thread.
    //    - `new URL('./lttb.worker.js', import.meta.url)` constructs the correct URL to your worker script.
    //      `import.meta.url` is crucial in modern JavaScript environments (including CRA) to correctly resolve
    //      module paths within worker scripts during bundling.
    workerRef.current = new Worker(
      new URL("./lttb.worker.js", import.meta.url)
    );

    // 2. Handle messages from the worker (onmessage event):
    //    - The `onmessage` event listener is triggered when the worker sends a message back using `postMessage()`.
    //    - `event.data` contains the data sent from the worker.
    workerRef.current.onmessage = (event) => {
      if (event.data.error) {
        console.error("Worker error:", event.data.error);
        return;
      }
      setDecimatedStockData(event.data); // Update state with decimated data from worker
    };

    // 3. Handle worker errors (onerror event):
    //    - The `onerror` event listener is triggered if an error occurs within the worker script.
    workerRef.current.onerror = (error) => {
      console.error("Worker error:", error);
    };

    // Simulate receiving new stock data every second
    const intervalId = setInterval(() => {
      const newDataPoint = generateStockData(1)[0]; // Generate one data point
      setOriginalStockData((prevData) => {
        const updatedData = [...prevData, newDataPoint];
        if (updatedData.length > dataBufferSize) {
          updatedData.shift(); // Keep buffer size
        }
        return updatedData;
      });
    }, 1000);

    // 4. Cleanup and Worker Termination (in cleanup function):
    //    - It's essential to terminate the worker when the component unmounts to release resources.
    //    - `workerRef.current.terminate()` immediately stops the worker and cleans up its resources.
    return () => {
      clearInterval(intervalId);
      workerRef.current.terminate(); // Terminate worker on unmount
    };
  }, [generateStockData, dataBufferSize]);

  useEffect(() => {
    // 📤 Send data to Web Worker for decimation
    if (originalStockData.length > chartDataPointsThreshold) {
      // 5. Send data to the worker (postMessage method):
      //    - `workerRef.current.postMessage({ ... })` sends a message to the worker.
      //    - The message can be any JavaScript object. Here we send the `originalStockData` and `chartDataPointsThreshold`.
      workerRef.current.postMessage({
        data: originalStockData,
        threshold: chartDataPointsThreshold,
      });
    } else {
      setDecimatedStockData(originalStockData); // If not enough data, just use original for decimated view as well
    }
  }, [originalStockData, chartDataPointsThreshold]);

  useEffect(() => {
    if (decimatedStockData.length > 0 && originalStockData.length > 0) {
      calculateRMSE(); // Calculate RMSE when decimated data is available
    }
  }, [decimatedStockData, originalStockData]);

  const calculateRMSE = useCallback(() => {
    if (decimatedStockData.length === 0 || originalStockData.length === 0) {
      setRMSE(null);
      return;
    }

    let squaredErrorSum = 0;
    let validPairsCount = 0;

    originalStockData.forEach((originalPoint) => {
      let closestDecimatedPoint = null;
      let minTimeDifference = Infinity;

      decimatedStockData.forEach((decimatedPoint) => {
        const timeDifference = Math.abs(originalPoint.x - decimatedPoint.x);
        if (timeDifference < minTimeDifference) {
          minTimeDifference = timeDifference;
          closestDecimatedPoint = decimatedPoint;
        }
      });

      if (closestDecimatedPoint) {
        squaredErrorSum += Math.pow(
          originalPoint.y - closestDecimatedPoint.y,
          2
        );
        validPairsCount++;
      }
    });

    if (validPairsCount > 0) {
      const calculatedRMSE = Math.sqrt(squaredErrorSum / validPairsCount);
      setRMSE(calculatedRMSE.toFixed(2)); // Format to 2 decimal places
    } else {
      setRMSE("N/A (No comparable data)"); // Indicate no comparable pairs found
    }
  }, [originalStockData, decimatedStockData]);

  return (
    <div className="App">
      <h1>Real-time Stock Price Monitor with LTTB</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={displayDecimated}
            onChange={(e) => setDisplayDecimated(e.target.checked)}
          />
          Display Decimated Data (LTTB)
        </label>
      </div>
      <LTTBChart
        originalData={originalStockData}
        decimatedData={decimatedStockData}
        displayDecimated={displayDecimated}
      />
      {rmse !== null && (
        <p>
          <b>RMSE (Root Mean Squared Error):</b> {rmse} - Lower RMSE indicates
          better decimated data accuracy. (Calculated with time-based closest
          point matching)
        </p>
      )}
      <p>
        Note: The RMSE now finds the closest decimated point in time for each
        original point to better handle misalignment. For rigorous analysis,
        consider more sophisticated time synchronization if needed.
      </p>
      <section>
        <h2>Web Worker Documentation & Alternatives to Chart.js</h2>

        <h3>Web Worker Setup in React (Key Steps):</h3>
        <ol>
          <li>
            <b>Create a Worker Script File:</b> Create a separate JavaScript
            file (e.g., `lttb.worker.js`) containing the code to be executed in
            the worker thread. Import necessary functions (like `lttb`).
          </li>
          <li>
            <b>Instantiate the Worker in React:</b> In your React component, use
            `useRef` to hold a reference to the Worker instance. In a
            `useEffect` hook (usually on component mount), create a new Worker
            using `workerRef.current = new Worker(new
            URL('./your-worker.worker.js', import.meta.url))`. Crucially, use
            `new URL(..., import.meta.url)` to ensure correct path resolution
            during bundling.
          </li>
          <li>
            <b>Communication via `postMessage` and `onmessage`:</b>
            <ul>
              <li>
                <b>Sending Data to Worker:</b> Use
                `workerRef.current.postMessage(data)` to send data to the
                worker. This data is available in the worker's `onmessage` event
                as `event.data`.
              </li>
              <li>
                <b>Receiving Data from Worker:</b> In the worker script, use
                `postMessage(result)` to send data back to the main thread. In
                your React component, set up `workerRef.current.onmessage =
                (event) = {/* handle event.data */}` to receive and process data
                from the worker.
              </li>
            </ul>
          </li>
          <li>
            <b>Error Handling:</b> Implement `workerRef.current.onerror =
            (error) = {/* handle error */}` to catch errors that occur in the
            worker. In the worker, you can send error messages back to the main
            thread using `postMessage()`.
          </li>
          <li>
            <b>Worker Termination:</b> In the `useEffect` cleanup function, call
            `workerRef.current.terminate()` to stop the worker and release
            resources when the component unmounts. This is essential to prevent
            memory leaks and ensure proper resource management.
          </li>
        </ol>

        <h3>Alternatives to `react-chartjs-2` for Greater Flexibility:</h3>
        <ul>
          <li>
            <b>Chart.js (Core - Canvas):</b> You can use the core Chart.js
            library directly (without `react-chartjs-2`) for more fine-grained
            control over chart creation and updates. Requires more manual DOM
            manipulation within React refs, but offers canvas-based performance
            and extensive customization options.
          </li>
          <li>
            <b>ECharts (with `echarts-for-react`):</b> A powerful, feature-rich
            canvas-based charting library. `echarts-for-react` provides a React
            wrapper. Excellent for complex charts, large datasets, and
            interactive visualizations. Very customizable and performant.
          </li>
          <li>
            <b>ApexCharts (with `react-apexcharts`):</b> Another popular
            canvas-based charting library known for its modern look and ease of
            use. `react-apexcharts` is the React wrapper. Good performance and a
            wide range of chart types, themes, and customization.
          </li>
          <li>
            <b>TradingView Lightweight Charts:</b> Specifically designed for
            financial charts and real-time data. Canvas-based, extremely
            performant, and optimized for financial time series data. React
            integration might be more manual but highly suitable for stock price
            charts.
          </li>
          <li>
            <b>D3.js:</b> A fundamental data visualization library offering
            unmatched flexibility. While often used with SVG, it can also be
            used with Canvas. Requires significantly more coding and a deeper
            understanding of visualization principles but provides complete
            control over every aspect of the chart. Can be overkill for basic
            line charts but essential for highly custom or novel visualizations.
            Consider libraries like `nivo` or `vx` which are built on top of D3
            and offer React-friendly components while retaining D3's power.
          </li>
          <li>
            <b>Konva.js:</b> A 2D Canvas JavaScript framework. For complete
            low-level control. You would build your chart components essentially
            from scratch using Konva primitives (shapes, lines, text, etc.).
            This offers maximum flexibility and performance optimization but
            requires the most development effort.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
