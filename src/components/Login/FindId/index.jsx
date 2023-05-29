import React, { useRef, useState } from "react";
import styles from "./FindId.module.css";
import axios from "../../../api/core";

const FindId = ({ setIsFindPage }) => {
  const [email, setEmail] = useState("");
  const msgRef = useRef();
  const findID = async () => {
    try {
      if (email === "") {
        msgRef.current.innerHTML =
          "<strong>Email</strong>을 빈칸없이 입력해 주세요.";
        msgRef.current.style.color = "#ff003e";
        msgRef.current.style.display = "block";
        return;
      }
      const res = await axios.get("auth/get-userid", {
        params: {
          email: email,
        },
      });
      console.log(res);
      const id = res.data.successCode.message;
      msgRef.current.innerHTML = `아이디는 <strong>${id}</strong>입니다.`;
      msgRef.current.style.color = "#03c75a";
    } catch (err) {
      if (err.response.status === 500) {
        msgRef.current.innerHTML = "유효하지않는 email입니다.";
        msgRef.current.style.color = "#ff003e";
        msgRef.current.style.display = "block";
        return;
      }
    }
  };
  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Email을 입력해주세요."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={findID}>찾기</button>
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

export default FindId;
