import React, { useState } from "react";
import Signin from "../../components/Login/Signin";
import Signup from "../../components/Login/Signup";
import styles from "./Login.module.css";

export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const toggleSign = (e) => {
    e.preventDefault();
    setIsLoginPage(!isLoginPage);
  };
  return (
    <section className={`${styles.container} ${styles.forms}`}>
      <div className={`${styles.form} ${styles.login}`}>
        <div className={styles.formContent}>
          <header className={styles.header}>
            {isLoginPage ? "로그인" : "회원가입"}
          </header>
          {isLoginPage ? (
            <Signin isLoginPage={isLoginPage} toggleSign={toggleSign} />
          ) : (
            <Signup isLoginPage={isLoginPage} toggleSign={toggleSign} />
          )}
        </div>
      </div>
    </section>
  );
}
