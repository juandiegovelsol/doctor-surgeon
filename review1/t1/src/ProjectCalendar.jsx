import React, { useRef, useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

const ProjectCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Project Alpha - Phase 1",
      start: "2025-01-26",
      end: "2025-01-28",
      allDay: true,
      backgroundColor: "blue",
      borderColor: "blue",
    },
    {
      id: "2",
      title: "Project Beta - Sprint Review",
      start: "2025-01-27T10:00:00",
      end: "2025-01-27T12:00:00",
      allDay: false,
      backgroundColor: "green",
      borderColor: "green",
    },
    // Add more project timelines as events
  ]);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const handleEventDrop = useCallback((info) => {
    console.log(info);
    setIsConfirmationOpen(true);
    setEventToUpdate(info);
  }, []);

  const handleConfirmReschedule = useCallback(() => {
    if (eventToUpdate) {
      const { event, delta } = eventToUpdate;
      const updatedEvents = events.map((e) =>
        e.id === event.id
          ? {
              ...e,
              start: event.startStr,
              end: event.endStr ? event.endStr : null,
            }
          : e
      );
      setEvents(updatedEvents);
      // Here you would typically make an API call to update the backend with the new dates
      console.log(`${event.title} was dropped on: ${event.startStr}`);
    }
    setIsConfirmationOpen(false);
    setEventToUpdate(null);
  }, [eventToUpdate, events, setEvents]);

  const handleCancelReschedule = useCallback(() => {
    if (eventToUpdate) {
      eventToUpdate.revert(); // Revert the drag
    }
    setIsConfirmationOpen(false);
    setEventToUpdate(null);
  }, [eventToUpdate]);

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        editable={true} // Enable drag and drop
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        eventDrop={handleEventDrop}
        // Optionally handle eventResize for resizing events with confirmation
        eventResize={(info) => {
          setIsConfirmationOpen(true);
          setEventToUpdate(info);
        }}
      />

      {isConfirmationOpen && eventToUpdate && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
          }}
        >
          <h3>Confirm Reschedule</h3>
          <p>
            Are you sure you want to reschedule{" "}
            <b>{eventToUpdate.event.title}</b> to:
          </p>
          <p>
            <b>Start:</b> {eventToUpdate.event.startStr}
            {eventToUpdate.event.endStr && (
              <>
                , <b>End:</b> {eventToUpdate.event.endStr}
              </>
            )}
          </p>
          <button onClick={handleConfirmReschedule}>Confirm</button>
          <button onClick={handleCancelReschedule}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProjectCalendar;
