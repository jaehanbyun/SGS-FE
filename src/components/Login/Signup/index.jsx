import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToggleSign from "../ToggleSign";
import styles from "./Signup.module.css";
import axios from "../../../api/core";

export default function Signup({ isLoginPage, toggleSign }) {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  });
  const [isError, setIsError] = useState(false);
  const errRef = useRef();
  const pwdErrRef = useRef();
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [isError]);

  const onSignUp = async (e) => {
    try {
      e.preventDefault();
      if (
        userInfo.id === "" ||
        userInfo.email === "" ||
        userInfo.pwd === "" ||
        userInfo.confirmPwd === ""
      ) {
        errRef.current.innerHTML =
          "<strong>회원정보</strong>를 빈칸없이 입력해 주세요.";
        errRef.current.style.display = "block";
        return;
      }
      if (userInfo.pwd !== userInfo.confirmPwd) {
        errRef.current.innerHTML =
          "<strong>비밀번호</strong>가 일치하지 않습니다.";
        errRef.current.style.display = "block";
        return;
      }

      const res = await axios.post("/auth/sign-up", {
        id: userInfo.id,
        email: userInfo.email,
        password: userInfo.pwd,
      });
      console.log(res.data);
      navigate("/success");
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="ID"
          className={styles.input}
          onChange={(e) => {
            setUserInfo({ ...userInfo, id: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          maxLength={16}
          onChange={(e) => {
            const temp = e.target.value;
            setUserInfo({ ...userInfo, pwd: temp });
            if (passwordRegex.test(temp)) {
              pwdErrRef.current.style.color = "#03c75a";
              pwdErrRef.current.innerHTML = "사용가능한 비밀번호 입니다.";
              pwdErrRef.current.style.display = "block";
            } else {
              pwdErrRef.current.style.color = "#ff003e";
              pwdErrRef.current.innerHTML =
                "8~16자 영문, 숫자, 특수문자를 사용하세요.";
              pwdErrRef.current.style.display = "block";
            }
          }}
        />
        <div className={`${styles.err} ${styles.pwdErr}`} ref={pwdErrRef}></div>
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
          maxLength={16}
          onChange={(e) => {
            setUserInfo({ ...userInfo, confirmPwd: e.target.value });
          }}
        />
        <div className={styles.formLink}>
          <Link className={styles.forgotPW}>아이디 찾기</Link>
          <Link className={styles.forgotPW}>비밀번호 찾기</Link>
        </div>
        <div className={styles.err} ref={errRef}></div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <button onClick={onSignUp}>회원가입</button>
        </div>
      </form>
      <ToggleSign isLoginPage={isLoginPage} toggleSign={toggleSign} />
    </>
  );
}
