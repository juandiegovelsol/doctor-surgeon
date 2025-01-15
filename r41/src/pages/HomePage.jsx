import React from "react";
import CalendarComponent from "../components/CalendarComponent";
import ActiveDatesListComponent from "../components/ActiveDatesListComponent";

function HomePage({ logData }) {
  return (
    <div>
      <h1>Server Request Log Visualizer</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "30px" }}>
          <CalendarComponent logData={logData} />
        </div>
        <div>
          <ActiveDatesListComponent logData={logData} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
