import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
export default function Signup({ toggleSignup }) {
  return (
    <>
      <form className={styles.form}>
        <div className={`${styles.field} ${styles.inputField}`}>
          <input type="email" className={styles.input} placeholder="Email" />
        </div>
        <div className={`${styles.field} ${styles.inputField}`}>
          <input
            type="password"
            className={styles.password}
            placeholder="Password"
          />
        </div>

        <div className={`${styles.field} ${styles.inputField}`}>
          <input
            type="password"
            className={styles.password}
            placeholder="Password"
          />
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
          <button>가입하기</button>
        </div>
      </form>
      <div className={styles.formLink}>
        <span>
          이미 계정이 있으신가요?{" "}
          <span onClick={toggleSignup} className={styles.loginLink}>
            Login
          </span>
        </span>
      </div>
    </>
  );
}
