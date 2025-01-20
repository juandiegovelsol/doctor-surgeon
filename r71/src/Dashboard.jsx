// Dashboard.js
import React from "react";
import { useFeedback } from "./FeedbackContext";

const Dashboard = () => {
  const { feedbackSubmissions, analyticsData, exportFeedbackToCSV } =
    useFeedback(); // Get export function from context

  return (
    <div>
      <h2>Feedback Dashboard</h2>
      <h3>Analytics</h3>
      <p>Total Submissions: {analyticsData.totalSubmissions}</p>
      <p>Average Rating: {analyticsData.averageRating.toFixed(2)}</p>{" "}
      {/* Display average rating to 2 decimal places */}
      <h3>Recent Feedback Submissions</h3>
      <ul>
        {feedbackSubmissions.map((feedback, index) => (
          <li key={index}>
            <p>Timestamp: {feedback.timestamp}</p>
            {feedback.rating && <p>Rating: {feedback.rating}</p>}
            <p>Comment: {feedback.comment}</p>
            <hr />
          </li>
        ))}
      </ul>
      {feedbackSubmissions.length === 0 && <p>No feedback submissions yet.</p>}
      <button onClick={exportFeedbackToCSV}>Export Feedback as CSV</button>{" "}
      {/* Export button */}
    </div>
  );
};

export default Dashboard;
