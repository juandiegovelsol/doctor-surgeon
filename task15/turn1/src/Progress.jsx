import React from "react";
import "./Progress.css";

function Progress({ progress }) {
  const angle = progress * 3.6; // Calculate the angle based on the progress percentage
  return (
    <div
      className="progress-ring"
      style={{
        background: `conic-gradient(transparent 0deg, blue ${angle}deg`,
      }}
    ></div>
  );
}

export default Progress;
