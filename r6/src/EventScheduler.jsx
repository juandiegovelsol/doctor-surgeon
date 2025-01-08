import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function EventScheduler() {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([
    // Example booked appointments (you'd fetch this from an API or data source)
    { start: dayjs("2025-01-07T10:00"), end: dayjs("2025-01-07T10:30") },
    { start: dayjs("2025-01-07T14:00"), end: dayjs("2025-01-07T15:00") },
  ]);

  const workingHoursStart = 9; // 9 AM
  const workingHoursEnd = 17; // 5 PM
  const slotDurationMinutes = 30;

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots();
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate, bookedAppointments]);

  useEffect(() => {
    console.log(availableTimeSlots);
  }, [availableTimeSlots]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const generateTimeSlots = () => {
    const selectedDay = dayjs(selectedDate);
    const startOfDay = selectedDay.hour(workingHoursStart).minute(0).second(0);
    const endOfDay = selectedDay.hour(workingHoursEnd).minute(0).second(0);
    const slots = [];
    let currentTime = startOfDay;

    while (currentTime.isBefore(endOfDay)) {
      const slotEnd = currentTime.add(slotDurationMinutes, "minute");
      slots.push({ start: currentTime, end: slotEnd });
      currentTime = slotEnd;
    }

    filterBookedSlots(slots);
  };

  const filterBookedSlots = (allSlots) => {
    const availableSlots = allSlots.filter((slot) => {
      return !bookedAppointments.some((bookedSlot) => {
        return (
          slot.start.isBefore(bookedSlot.end) &&
          slot.end.isAfter(bookedSlot.start)
        );
      });
    });
    setAvailableTimeSlots(
      availableSlots.map((slot) => ({
        startTime: slot.start.format("h:mm A"),
        endTime: slot.end.format("h:mm A"),
        rawStartTime: slot.start,
      }))
    );
  };

  return (
    <div>
      <div>
        <label htmlFor="availability-date">Select Date:</label>
        <input
          type="date"
          id="availability-date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {availableTimeSlots.length > 0 && (
        <div>
          <h3>Available Time Slots:</h3>
          <ul>
            {availableTimeSlots.map((slot) => (
              <li key={slot.rawStartTime.valueOf()}>
                {slot.startTime} - {slot.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {availableTimeSlots.length === 0 && selectedDate && (
        <p>No available time slots for the selected date.</p>
      )}
    </div>
  );
}

export default EventScheduler;
