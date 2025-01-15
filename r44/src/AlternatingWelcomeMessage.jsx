// AlternatingWelcomeMessage.js
import React, { useState, useEffect, useRef } from "react";
import "./AlternatingWelcomeMessage.css"; // Import CSS for styling

const AlternatingWelcomeMessage = ({ baseMessage, names }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledNames, setShuffledNames] = useState([...names]); // State to hold shuffled names
  const intervalIdRef = useRef(null); // Ref to hold the interval ID

  useEffect(() => {
    // Shuffle names initially and when names prop changes
    const shuffleArray = (array) => {
      let newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    setShuffledNames(shuffleArray(names));
  }, [names]);

  useEffect(() => {
    // Clear any existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Set up a new interval
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % shuffledNames.length;
      });
    }, 2000); // Change name every 2 seconds (adjust as needed)

    return () => {
      // Cleanup on component unmount or when names change
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [shuffledNames]); // Re-run effect if shuffledNames changes (after initial shuffle on names prop change)

  return (
    <div className="welcome-message-container">
      <span className="base-message">{baseMessage} </span>
      <div className="dynamic-text-container">
        <div className="dynamic-text-slot">
          <div
            className="dynamic-text"
            style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
          >
            {shuffledNames.map((name, index) => (
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
