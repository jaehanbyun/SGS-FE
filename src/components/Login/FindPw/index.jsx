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
  const pwdRef = useRef();
  const pwdBtnRef = useRef();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

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
      setSuccessCode(res.data.data.message);
      emailErrRef.current.style.display = "none";
      authRef.current.style.display = "block";
      authBtnRef.current.style.display = "block";
    } catch (err) {
      console.log(err);
    }
  };
  const authEmail = () => {
    if (authCode === successCode) {
      pwdRef.current.disabled = false;
      pwdBtnRef.current.style.display = "block";
      emailErrRef.current.style.display = "none";
    } else {
      emailErrRef.current.innerHTML = "인증코드가 틀렸습니다.";
      emailErrRef.current.style.color = "#ff003e";
      emailErrRef.current.style.display = "block";
    }
  };

  const changePwd = async () => {
    try {
      if (id === "" || email === "" || authCode === "" || pwd === "") {
        msgRef.current.innerHTML =
          "<strong>회원정보</strong>를 빈칸없이 입력해 주세요.";
        msgRef.current.style.color = "#ff003e";
        msgRef.current.style.display = "block";
        return;
      }
      await axios.patch(`/auth/edit-password`, {
        id: id,
        email: email,
        password: pwd,
      });
      setIsFindPage(false);
    } catch (err) {
      console.log(err);
    }
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
      <div style={{ position: "relative" }}>
        <input
          ref={pwdRef}
          disabled
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          onChange={(e) => {
            setPwd(e.target.value);
            const temp = e.target.value;
            if (passwordRegex.test(temp)) {
              msgRef.current.style.color = "#03c75a";
              msgRef.current.innerHTML = "사용가능한 비밀번호 입니다.";
              msgRef.current.style.display = "block";
            } else {
              msgRef.current.style.color = "#ff003e";
              msgRef.current.innerHTML =
                "8~16자 영문, 숫자, 특수문자를 사용하세요.";
              msgRef.current.style.display = "block";
            }
          }}
        />
        <button ref={pwdBtnRef} className={styles.pwdBtn} onClick={changePwd}>
          변경
        </button>
      </div>
      <div ref={msgRef} className={`${styles.err} ${styles.detailErr}`}></div>
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
