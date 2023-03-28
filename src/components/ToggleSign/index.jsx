import React from "react";
import styles from "./ToggleSign.module.css";
export default function ToggleSign({ toggleSign }) {
  return (
    <div className={styles.formLink}>
      <span>
        계정이 없습니까?{" "}
        <span onClick={toggleSign} className={styles.signupLink}>
          Signup
        </span>
      </span>
    </div>
  );
}
