// src/components/Achievement.jsx
import React from "react";
import styles from "./Achievement.module.scss";

const Achievement = ({ title, description }) => {
  return (
    <div className={styles.achievement}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Achievement;
