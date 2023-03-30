import React from "react";
import styles from "./Input.module.css";
export default function Input({ type, placeholder }) {
  return (
    <div className={`${styles.field} ${styles.inputField}`}>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
