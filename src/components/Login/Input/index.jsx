import React from "react";
import styles from "./Input.module.css";
export default function Input({ type, placeholder, onChange }) {
  return (
    <div className={`${styles.field} ${styles.inputField}`}>
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}
