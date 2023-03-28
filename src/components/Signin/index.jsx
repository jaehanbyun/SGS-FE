import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input";
import ToggleSign from "../ToggleSign";
import styles from "./Signin.module.css";

export default function Signin({ toggleSign }) {
  return (
    <>
      <form className={styles.form}>
        <Input type="text" placeholder="ID" />
        <Input type="password" placeholder="Password" />
        <div className={styles.formLink}>
          <Link className={styles.forgotPW}>아이디 찾기</Link>
          <Link className={styles.forgotPW}>비밀번호 찾기</Link>
        </div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <button>Login</button>
        </div>
      </form>
      <ToggleSign toggleSign={toggleSign} />
    </>
  );
}
