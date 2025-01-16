// src/components/Content.jsx
import React from "react";
import Card from "./Card";
import styles from "./Content.module.scss";

const Content = ({ clients }) => {
  return (
    <div className={styles.content}>
      {clients.map((client, index) => (
        <Card key={client.id} client={client} index={index} />
      ))}
    </div>
  );
};

export default Content;
