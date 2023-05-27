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
  const [successCode, setSuccessCode] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isError, setIsError] = useState(false);

  const errRef = useRef();
  const pwdErrRef = useRef();
  const idErrRef = useRef();
  const emailErrRef = useRef();
  const emailRef = useRef();
  const emailBtnRef = useRef();
  const authRef = useRef();
  const authBtnRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();

  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [isError]);

  const isValidId = async (e) => {
    try {
      e.preventDefault();
      if (userInfo.id === "") {
        idErrRef.current.innerHTML =
          "<strong>ID</strong>를 빈칸없이 입력해 주세요.";
        idErrRef.current.style.color = "#ff003e";
        idErrRef.current.style.display = "block";
        return;
      }
      const res = await axios.post(
        `/auth/check-userid`,
        {},
        {
          params: {
            id: userInfo.id,
          },
        }
      );
      emailRef.current.disabled = false;
      emailBtnRef.current.style.display = "block";
      idErrRef.current.style.color = "#03c75a";
      idErrRef.current.style.display = "block";
      idErrRef.current.innerHTML = "사용가능한 ID 입니다.";
    } catch (err) {
      if (err.response.status === 500) {
        idErrRef.current.innerHTML = "이미 존재하는 ID 입니다.";
        idErrRef.current.style.color = "#ff003e";
        idErrRef.current.style.display = "block";
        return;
      }
    }
  };
  const sendMail = async (e) => {
    try {
      e.preventDefault();
      if (userInfo.email === "") {
        emailErrRef.current.innerHTML =
          "<strong>email</strong>을 빈칸없이 입력해 주세요.";
        emailErrRef.current.style.color = "#ff003e";
        emailErrRef.current.style.display = "block";
        return;
      }
      const res = await axios.post(
        `/auth/send-mail`,
        {},
        {
          params: {
            email: userInfo.email,
          },
        }
      );
      setSuccessCode(res.data.successCode.message);
      emailErrRef.current.style.display = "none";
      authRef.current.style.display = "block";
      authBtnRef.current.style.display = "block";
    } catch (err) {
      if (err.response.status === 500) {
        emailErrRef.current.innerHTML = "이미 인증된 메일입니다.";
        emailErrRef.current.style.color = "#ff003e";
        emailErrRef.current.style.display = "block";
        return;
      }
    }
  };
  const authEmail = (e) => {
    e.preventDefault();
    if (authCode === successCode) {
      pwdRef.current.disabled = false;
      confirmPwdRef.current.disabled = false;
      emailErrRef.current.style.display = "none";
    } else {
      emailErrRef.current.innerHTML = "인증코드가 틀렸습니다.";
      emailErrRef.current.style.color = "#ff003e";
      emailErrRef.current.style.display = "block";
    }
  };
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
      if (err.response.status === 500) {
        errRef.current.innerHTML = "유효하지 않는 정보가 존재합니다.";
        errRef.current.style.color = "#ff003e";
        errRef.current.style.display = "block";
        return;
      }
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
        <button className={styles.validIdBtn} onClick={isValidId}>
          중복확인
        </button>
        <div
          className={`${styles.err} ${styles.detailErr}`}
          ref={idErrRef}
        ></div>
        <input
          ref={emailRef}
          disabled
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
        <button
          ref={emailBtnRef}
          style={{ display: "none" }}
          className={styles.emailBtn}
          onClick={sendMail}
        >
          인증코드 전송
        </button>
        <input
          ref={authRef}
          style={{ display: "none" }}
          type="text"
          placeholder="인증코드를 입력해주세요."
          className={styles.input}
          onChange={(e) => {
            setAuthCode(e.target.value);
          }}
        />
        <button
          ref={authBtnRef}
          style={{ display: "none" }}
          className={styles.authBtn}
          onClick={authEmail}
        >
          제출
        </button>
        <div
          className={`${styles.err} ${styles.detailErr}`}
          ref={emailErrRef}
        ></div>
        <input
          ref={pwdRef}
          disabled
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
        <div
          className={`${styles.err} ${styles.detailErr}`}
          ref={pwdErrRef}
        ></div>
        <input
          ref={confirmPwdRef}
          disabled
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
