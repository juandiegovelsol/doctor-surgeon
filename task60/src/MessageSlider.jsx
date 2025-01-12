import React, { useState, useEffect } from "react";

const messageColors = [
  "#2ecc71", // Emerald green
  "#3498db", // Peter River blue
  "#9b59b6", // Amethyst purple
  "#e67e22", // Carrot orange
  "#e74c3c", // Alizarin red
];

const MessageSlider = ({ messages }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [slideUp, setSlideUp] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (!messages || messages.length === 0) {
      return;
    }

    if (isInitialRender) {
      setSlideUp(true); // Animate in the first message on initial render
      setIsInitialRender(false);
    } else {
      setSlideUp(true); // Animate in subsequent messages
    }

    const timer = setTimeout(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setSlideUp(false); // Reset for the next message to slide up
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, messages, isInitialRender]);

  if (!messages || messages.length === 0) {
    return <div>No messages to display.</div>;
  }

  const messageStyle = {
    backgroundColor: messageColors[currentMessageIndex % messageColors.length],
    padding: "20px",
    textAlign: "center",
    color: "white",
    marginBottom: "10px",
    transform: slideUp ? "translateY(0)" : "translateY(100%)",
    opacity: 1,
    transition: "transform 0.5s ease-out",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  };

  const containerStyle = {
    width: "300px" /* Fixed width */,
    height: "80px" /* Fixed height */,
    overflow: "hidden",
    position: "relative",
    margin: "0 auto" /* Center the container if needed */,
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>{messages[currentMessageIndex]}</div>
    </div>
  );
};

export default MessageSlider;
