// src/components/AchievementsSection.jsx
import React from "react";
import styles from "./AchievementsSection.module.scss";
import Achievement from "./Achievement";

const AchievementsSection = ({ achievements }) => {
  return (
    <section className={styles.achievementsSection}>
      <div className={styles.achievementsGrid}>
        {achievements.map((achievement, index) => (
          <Achievement
            key={index}
            title={achievement.title}
            description={achievement.description}
          />
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
