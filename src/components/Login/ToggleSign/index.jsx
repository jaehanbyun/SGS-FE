import React from "react";
import styles from "./ToggleSign.module.css";
export default function ToggleSign({ isLogin, toggleSign }) {
  return (
    <div className={styles.formLink}>
      <span>
        {isLogin ? "계정이 없습니까? " : "이미 회원입니까? "}
        <span onClick={toggleSign} className={styles.signupLink}>
          {isLogin ? "회원가입" : "로그인"}
        </span>
      </span>
    </div>
  );
}
