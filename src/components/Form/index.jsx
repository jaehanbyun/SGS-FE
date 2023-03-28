import React from "react";
import Input from "../Input";
import styles from "./Form.module.css";

export default function Form() {
  return (
    <form className={styles.form}>
      <Input type="email" placeholder="Email" />
      <div className={`${styles.field} ${styles.inputField}`}>
        <Input type="password" placeholder="Password" />
        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            fontSize: "1em",
            color: "#8b8b8b",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          visibility_off
        </span>
      </div>
      <div className={styles.formLink}>
        <Link className={styles.forgotPW}>비밀 번호를 잊었을 때</Link>
      </div>
      <div className={`${styles.field} ${styles.buttonField}`}>
        <button>Login</button>
      </div>
    </form>
  );
}
