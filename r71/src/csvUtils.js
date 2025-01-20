// csvUtils.js
export const convertToCSV = (feedbackSubmissions) => {
  if (!feedbackSubmissions || feedbackSubmissions.length === 0) {
    return ""; // Return empty CSV if no submissions
  }

  const headers = Object.keys(feedbackSubmissions[0]); // Get headers from the first submission object

  // Helper function to escape commas and quotes in strings for CSV format
  const escapeCsvValue = (value) => {
    if (typeof value === "string") {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`; // Escape quotes by doubling them and enclose in quotes
      }
    }
    return value;
  };

  const csvRows = feedbackSubmissions.map((submission) => {
    return headers
      .map((header) => escapeCsvValue(submission[header]))
      .join(",");
  });

  return [headers.join(","), ...csvRows].join("\n");
};
