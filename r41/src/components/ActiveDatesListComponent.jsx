import React from "react";
import { Link } from "react-router-dom";

function ActiveDatesListComponent({ logData }) {
  const activeDates = Object.keys(logData || {});

  if (activeDates.length === 0) {
    return <p>No activity found.</p>;
  }

  return (
    <div>
      <h3>Days with Activity</h3>
      <ul>
        {activeDates.map((date) => (
          <li key={date}>
            <Link to={`/date/${date}`}>
              {new Date(date).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveDatesListComponent;
