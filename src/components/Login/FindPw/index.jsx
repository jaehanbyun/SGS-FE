import React, { useRef, useState } from "react";
import styles from "./FindPw.module.css";
import axios from "../../../api/core";

const FindPw = ({ setIsFindPage }) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [successCode, setSuccessCode] = useState("");
  const authRef = useRef();
  const authBtnRef = useRef();

  const emailErrRef = useRef();
  const msgRef = useRef();

  const sendMail = async (e) => {
    try {
      e.preventDefault();
      if (email === "") {
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
            email: email,
            type: "edit",
          },
        }
      );
      console.log(res);
      setSuccessCode(res.data.successCode.message);
      emailErrRef.current.style.display = "none";
      authRef.current.style.display = "block";
      authBtnRef.current.style.display = "block";
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
        emailErrRef.current.innerHTML = "올바르지 않은 이메일입니다.";
        emailErrRef.current.style.color = "#ff003e";
        emailErrRef.current.style.display = "block";
        return;
      }
    }
  };
  const authEmail = () => {
    try {
    } catch (err) {}
  };

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="ID를 입력해주세요."
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email을 입력해주세요."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button
        disabled={!(id && email)}
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
        disabled
        type="text"
        placeholder="새 비밀번호를 입력해주세요."
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <button onClick={() => {}}>찾기</button>
      <div ref={msgRef} className={styles.msg}></div>
      <div className={styles.field}>
        <button
          onClick={() => {
            setIsFindPage(false);
          }}
        >
          로그인 페이지로
        </button>
      </div>
    </div>
  );
};

export default FindPw;
