import React from "react";
import { useParams, Link } from "react-router-dom";
import LogListComponent from "../components/LogListComponent";
import ResponseCodeChartComponent from "../components/ResponseCodeChartComponent";

function DatePage({ logData }) {
  const { date } = useParams();
  const logsForDate = logData[date] || [];

  const responseCodeCounts = logsForDate.reduce((counts, log) => {
    counts[log.responseCode] = (counts[log.responseCode] || 0) + 1;
    return counts;
  }, {});

  return (
    <div>
      <h2>Data for {new Date(date).toLocaleDateString()}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <LogListComponent logs={logsForDate} />
        </div>
        <div style={{ width: "400px" }}>
          {logsForDate.length > 0 ? (
            <ResponseCodeChartComponent responseCodes={responseCodeCounts} />
          ) : (
            <p>No logs for this date.</p>
          )}
        </div>
      </div>
      <Link to="/">Back to Calendar</Link>
    </div>
  );
}

export default DatePage;
