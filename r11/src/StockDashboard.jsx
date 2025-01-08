import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MultiStockComparison = () => {
  const [stockSymbols, setStockSymbols] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [historicalData, setHistoricalData] = useState({}); // Store data for each stock
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your actual API key

  const fetchStockData = async (symbols) => {
    setLoading(true);
    setError(null);
    try {
      const promises = symbols.map(async (symbol) => {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );
        const timeSeriesData = response.data["Time Series (Daily)"];
        if (timeSeriesData) {
          const formattedData = Object.keys(timeSeriesData)
            .sort()
            .map((date) => ({
              date,
              close: parseFloat(timeSeriesData[date]["4. close"]),
            }));
          return { symbol, data: formattedData };
        } else {
          throw new Error(`No data found for symbol: ${symbol}`);
        }
      });

      const results = await Promise.all(promises);
      const newData = {};
      results.forEach((result) => {
        newData[result.symbol] = result.data;
      });
      setHistoricalData(newData);
    } catch (err) {
      setError(
        `Failed to fetch data. Please check the symbols and try again. ${err.message}`
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSymbol = () => {
    if (newSymbol.trim() && !stockSymbols.includes(newSymbol.toUpperCase())) {
      setStockSymbols([...stockSymbols, newSymbol.toUpperCase()]);
      setNewSymbol("");
    }
  };

  const handleRemoveSymbol = (symbolToRemove) => {
    setStockSymbols(stockSymbols.filter((symbol) => symbol !== symbolToRemove));
    // Optionally remove the data for this symbol from historicalData
    const { [symbolToRemove]: removed, ...rest } = historicalData;
    setHistoricalData(rest);
  };

  useEffect(() => {
    if (stockSymbols.length > 0) {
      fetchStockData(stockSymbols);
    } else {
      setHistoricalData({}); // Clear data when no symbols are selected
    }
  }, [stockSymbols]);

  useEffect(() => {
    console.log(historicalData);
  }, [historicalData]);

  const chartData =
    Object.keys(historicalData).length > 0
      ? Object.keys(historicalData[stockSymbols[0]] || {})
          .map((index) => {
            const date = historicalData[stockSymbols[0]][index]?.date;
            const dataPoint = { date };
            stockSymbols.forEach((symbol) => {
              const dataForSymbol = historicalData[symbol] || [];
              const matchingDataPoint = dataForSymbol.find(
                (item) => item.date === date
              );
              dataPoint[symbol] = matchingDataPoint
                ? matchingDataPoint.close
                : null;
            });
            return dataPoint;
          })
          .filter((point) => point.date) // Ensure there's a date to avoid errors
      : [];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#33a02c"]; // Add more colors if needed

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
        />
        <button onClick={handleAddSymbol} disabled={loading}>
          Add Stock
        </button>
      </div>

      <div>
        {stockSymbols.map((symbol) => (
          <span
            key={symbol}
            style={{
              margin: "5px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {symbol}
            <button
              onClick={() => handleRemoveSymbol(symbol)}
              style={{ marginLeft: "5px", cursor: "pointer" }}
            >
              X
            </button>
          </span>
        ))}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <p>Loading...</p>}

      {chartData.length > 0 && (
        <LineChart
          width={700}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Legend />
          {stockSymbols.map((symbol, index) => (
            <Line
              key={symbol}
              type="monotone"
              dataKey={symbol}
              stroke={COLORS[index % COLORS.length]}
              name={symbol}
            />
          ))}
        </LineChart>
      )}
    </div>
  );
};

export default MultiStockComparison;
/* 
import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend
);

const StockDashboard = () => {
  const [symbol, setSymbol] = useState("");
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "F84Q9AQDZARVPR82"; // Replace with your actual API key

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      );
      const timeSeriesData = response.data["Time Series (Daily)"];
      if (timeSeriesData) {
        // Format the data for the charting library
        const formattedData = Object.keys(timeSeriesData)
          .sort()
          .map((date) => ({
            date,
            open: parseFloat(timeSeriesData[date]["1. open"]),
            high: parseFloat(timeSeriesData[date]["2. high"]),
            low: parseFloat(timeSeriesData[date]["3. low"]),
            close: parseFloat(timeSeriesData[date]["4. close"]),
          }));
        setHistoricalData(formattedData);
      } else {
        setError("No data found for this symbol.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please check the symbol and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (symbol.trim()) {
      fetchStockData();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {historicalData && historicalData.length > 0 && (
        <Line
          data={{
            labels: historicalData.map((item) => item.date),
            datasets: [
              {
                label: "Close Price",
                data: historicalData.map((item) => item.close),
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Historical Close Price for ${symbol}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default StockDashboard; */
