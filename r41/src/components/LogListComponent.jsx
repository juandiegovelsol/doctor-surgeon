import React from "react";

function LogListComponent({ logs }) {
  return (
    <div>
      <ul>
        {logs.map((log, index) => (
          <li
            key={index}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            <p>
              <strong>IP</strong>: {log.ip}
            </p>
            <p>
              <strong>Time</strong>: {log.time}
            </p>
            <p>
              <strong>Request Type</strong>: {log.requestType}
            </p>
            <p>
              <strong>Route</strong>: {log.route}
            </p>
            <p>
              <strong>Protocol</strong>: {log.protocol}
            </p>
            <p>
              <strong>Response code</strong>: {log.responseCode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogListComponent;
