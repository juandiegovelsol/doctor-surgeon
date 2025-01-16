// src/components/Card.jsx
import React from "react";
import styles from "./Card.module.scss";

const Card = ({ client, index }) => {
  const placeholderLogoUrl = `https://placehold.co/600x400?text=client+${
    index + 1
  }`;

  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <img
          src={placeholderLogoUrl}
          alt={`${client.name} Logo`}
          className={styles.logo}
        />
      </div>
      <div className={styles.info}>
        <h3>{client.name}</h3>
        <p>
          <strong>Location:</strong> {client.location}
        </p>
        <p>
          <strong>ID:</strong> {client.id}
        </p>
        <p>
          <strong>Phone:</strong> {client.phone}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {client.isTrusted ? "Trusted" : "Not Trusted"}
        </p>
      </div>
    </div>
  );
};

export default Card;
