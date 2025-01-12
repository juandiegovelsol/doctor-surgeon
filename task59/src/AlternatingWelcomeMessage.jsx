// AlternatingWelcomeMessage.js
import React, { useState, useEffect, useRef } from "react";
import "./AlternatingWelcomeMessage.css"; // Import CSS for styling

const AlternatingWelcomeMessage = ({ baseMessage, names }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // State to hold the random starting index
  const intervalIdRef = useRef(null); // Ref to hold the interval ID

  useEffect(() => {
    // Choose a random starting index when names prop changes or component mounts
    const randomIndex = Math.floor(Math.random() * names.length);
    setStartIndex(randomIndex);
    setCurrentIndex(randomIndex); // Initialize currentIndex to the random start index
  }, [names]);

  useEffect(() => {
    // Clear any existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Set up a new interval
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % names.length; // Increment and wrap around in original order
      });
    }, 2000); // Change name every 2 seconds (adjust as needed)

    return () => {
      // Cleanup on component unmount or when names change
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [names]); // Re-run effect if names change

  return (
    <div className="welcome-message-container">
      <span className="base-message">{baseMessage} </span>
      <div className="dynamic-text-container">
        <div className="dynamic-text-slot">
          <div
            className="dynamic-text"
            style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
          >
            {names.map((name, index) => (
              <div key={index} className="dynamic-text-item">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternatingWelcomeMessage;
