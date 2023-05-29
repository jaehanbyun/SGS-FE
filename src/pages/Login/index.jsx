import React, { useState } from "react";
import Signin from "../../components/Login/Signin";
import Signup from "../../components/Login/Signup";
import styles from "./Login.module.css";
import FindId from "../../components/Login/FindId";
import FindPw from "../../components/Login/FindPw";

export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isFindPage, setIsFindPage] = useState(false);
  const [isFindId, setIsFindId] = useState(false);
  const toggleSign = (e) => {
    e.preventDefault();
    setIsLoginPage(!isLoginPage);
  };
  return (
    <section className={`${styles.container} ${styles.forms}`}>
      <div className={`${styles.form} ${styles.login}`}>
        <div className={styles.formContent}>
          <header className={styles.header}>
            {isFindPage
              ? isFindId
                ? "아이디 찾기"
                : "비밀번호 찾기"
              : isLoginPage
              ? "로그인"
              : "회원가입"}
          </header>
          {isFindPage ? (
            isFindId ? (
              <FindId setIsFindPage={setIsFindPage} />
            ) : (
              <FindPw setIsFindPage={setIsFindPage} />
            )
          ) : isLoginPage ? (
            <Signin
              setIsFindId={setIsFindId}
              setIsFindPage={setIsFindPage}
              isLoginPage={isLoginPage}
              toggleSign={toggleSign}
            />
          ) : (
            <Signup isLoginPage={isLoginPage} toggleSign={toggleSign} />
          )}
        </div>
      </div>
    </section>
  );
}
