import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DatePage from "./pages/DatePage";

// Example log data (replace with your actual data source)
const rawLogData = `
192.168.1.1 - - [10/Sep/2024:13:55:36 -0700] "GET /home HTTP/1.1" 200 1024
192.168.1.1 - - [11/Sep/2024:14:00:12 -0700] "GET /about HTTP/1.1" 404 2048
10.0.0.1 - - [11/Oct/2024:14:05:01 -0700] "POST /login HTTP/1.1" 302 512
10.0.0.1 - - [11/Oct/2024:14:05:01 -0700] "POST /login HTTP/1.1" 302 512
10.0.0.1 - - [11/Oct/2024:14:05:01 -0700] "POST /login HTTP/1.1" 302 512
10.0.0.1 - - [11/Oct/2024:14:05:01 -0700] "POST /login HTTP/1.1" 302 512
10.0.0.1 - - [11/Oct/2024:14:06:22 -0700] "GET /profile HTTP/1.1" 200 2560
192.166.1.1 - - [10/Oct/2024:13:55:36 -0700] "GET /home HTTP/1.1" 200 1024
`;

function parseLogData(logString) {
  const logLines = logString.trim().split("\n");
  const parsedLogs = {};

  logLines.forEach((line) => {
    const parts = line.split(" ");
    if (parts.length >= 10) {
      const ip = parts[0];
      const timestampPart = parts[3].slice(1); // Remove '['
      const datePart = timestampPart.split(":")[0];
      const timePart =
        timestampPart.split(":")[1] +
        ":" +
        timestampPart.split(":")[2] +
        ":" +
        timestampPart.split(":")[3];
      const date = new Date(datePart.replace("/", " ")).toLocaleDateString(
        "en-CA"
      ); // Format date to YYYY-MM-DD, this might need to be adjusted based on locale
      const requestLine = parts.slice(5, 8).join(" ").slice(1, -1); // Remove quotes
      const [requestType, routeProtocol] = requestLine.split(" ");
      const route = routeProtocol.split("HTTP")[0].trim();
      const protocol = "HTTP/1.1"; // Assuming HTTP/1.1 for all logs based on examples
      const responseCode = parts[8];

      if (!parsedLogs[date]) {
        parsedLogs[date] = [];
      }
      parsedLogs[date].push({
        ip: ip,
        time: timePart,
        requestType: requestType,
        route: route,
        protocol: protocol,
        responseCode: responseCode,
      });
    }
  });
  return parsedLogs;
}

function App() {
  const [logData, setLogData] = useState({});

  useEffect(() => {
    const parsedData = parseLogData(rawLogData);
    setLogData(parsedData);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage logData={logData} />} />
        <Route path="/date/:date" element={<DatePage logData={logData} />} />
      </Routes>
    </Router>
  );
}

export default App;
