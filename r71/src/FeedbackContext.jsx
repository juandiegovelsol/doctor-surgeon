// FeedbackContext.js
import React, { createContext, useState, useContext } from "react";
import { convertToCSV } from "./csvUtils"; // Import the CSV utility

const FeedbackContext = createContext();

// Create a Context Provider Component
export const FeedbackProvider = ({ children }) => {
  const [feedbackSubmissions, setFeedbackSubmissions] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    totalSubmissions: 0,
    averageRating: 0, // If you have ratings in your feedback form
    // ... other analytics data you need
  });

  // Function to add a new feedback submission
  const addFeedbackSubmission = (newFeedback) => {
    setFeedbackSubmissions([...feedbackSubmissions, newFeedback]);
    // Update analytics data whenever a new submission is added
    updateAnalytics(newFeedback);
  };

  // Function to update analytics data (example - you can customize this based on your needs)
  const updateAnalytics = (newFeedback) => {
    setAnalyticsData((prevAnalytics) => {
      let newTotalSubmissions = prevAnalytics.totalSubmissions + 1;
      let newAverageRating = prevAnalytics.averageRating;

      // Example: If feedback includes a rating field
      if (newFeedback.rating) {
        const currentTotalRating =
          prevAnalytics.averageRating * prevAnalytics.totalSubmissions;
        newAverageRating =
          (currentTotalRating + newFeedback.rating) / newTotalSubmissions;
      }

      return {
        totalSubmissions: newTotalSubmissions,
        averageRating: newAverageRating,
        // ... update other analytics data if needed
      };
    });
  };
  // Function to export feedback data to CSV
  const exportFeedbackToCSV = () => {
    const csvData = convertToCSV(feedbackSubmissions);
    if (!csvData) {
      alert("No feedback data to export."); // Or handle no data scenario in a better way
      return;
    }
    downloadCSV(csvData, "feedback-data.csv"); // Call the download function
  };

  // Function to trigger CSV download (client-side download)
  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Append to the document
    a.click();
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url); // Release the object URL
  };

  const contextValue = {
    feedbackSubmissions,
    addFeedbackSubmission,
    analyticsData,
    exportFeedbackToCSV, // Add the export function to the context
    // ...
  };

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Custom hook to consume the context (optional but recommended)
export const useFeedback = () => {
  return useContext(FeedbackContext);
};
