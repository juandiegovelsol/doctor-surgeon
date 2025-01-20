// FeedbackForm.js
import React, { useState } from "react";
import { useFeedback } from "./FeedbackContext";

const FeedbackForm = () => {
  const { addFeedbackSubmission } = useFeedback();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFeedback = {
      timestamp: new Date().toISOString(),
      rating: parseInt(rating), // Assuming rating is a number
      comment: comment,
      // ... other feedback data you collect from the form
    };
    addFeedbackSubmission(newFeedback);
    // Reset form fields after submission
    setRating("");
    setComment("");
    alert("Feedback submitted!"); // Optional success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
