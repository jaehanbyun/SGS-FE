import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input";

import ToggleSign from "../ToggleSign";
import styles from "./Signup.module.css";

export default function Signup({ isLoginPage, toggleSign }) {
  return (
    <>
      <form className={styles.form}>
        <Input type="text" placeholder="ID" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <div className={styles.formLink}>
          <Link className={styles.forgotPW}>아이디 찾기</Link>
          <Link className={styles.forgotPW}>비밀번호 찾기</Link>
        </div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <button>회원가입</button>
        </div>
      </form>
      <ToggleSign isLoginPage={isLoginPage} toggleSign={toggleSign} />
    </>
  );
}
