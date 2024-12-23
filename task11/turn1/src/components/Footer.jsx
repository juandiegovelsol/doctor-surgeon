// src/components/Footer.jsx
import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Our Company</p>
    </footer>
  );
};

export default Footer;
