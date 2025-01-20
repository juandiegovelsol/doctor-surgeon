import React, { useState } from "react";
import { TextField, Rating, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [feedbackError, setFeedbackError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    setFeedbackError(""); // Clear error on change
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    setRatingError(""); // Clear error on change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (!feedback.trim()) {
      setFeedbackError("Feedback is required");
      isValid = false;
    }

    if (rating === null) {
      setRatingError("Rating is required");
      isValid = false;
    }

    if (isValid) {
      // Handle form submission logic here
      console.log("Feedback:", feedback);
      console.log("Rating:", rating);
      // Reset form after successful submission
      setFeedback("");
      setRating(null);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        maxWidth: 500,
        margin: "auto",
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Customer Feedback
      </Typography>
      <TextField
        label="Your Feedback"
        multiline
        rows={4}
        variant="outlined"
        value={feedback}
        onChange={handleFeedbackChange}
        error={!!feedbackError}
        helperText={feedbackError}
      />
      <Box sx={{ mt: 2 }}>
        <Typography component="legend">Rate your experience</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleRatingChange}
        />
        {ratingError && (
          <Typography variant="caption" color="error">
            {ratingError}
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">
          Submit Feedback
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackForm;
