import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function CalendarComponent({ logData }) {
  const [date, setDate] = useState(new Date());
  const [activeDates, setActiveDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const datesWithLogs = Object.keys(logData || {}); // Handle case when logData is initially empty
    setActiveDates(datesWithLogs.map((d) => new Date(d + "T00:00:00"))); // Append time part to ensure correct date object and parsing
  }, [logData]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toLocaleDateString("en-CA"); // YYYY-MM-DD format for comparison
      if (
        activeDates.some(
          (activeDate) => activeDate.toLocaleDateString("en-CA") === dateString
        )
      ) {
        return "react-calendar__tile--active"; // Changed to react-calendar's built-in active class
      }
    }
    return null;
  };

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handleDateClick = (clickedDate) => {
    const dateString = clickedDate.toLocaleDateString("en-CA");
    if (logData[dateString]) {
      navigate(`/date/${dateString}`);
    } else {
      alert("No data for this date.");
    }
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        onClickDay={handleDateClick}
      />
    </div>
  );
}

export default CalendarComponent;
