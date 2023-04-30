import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedUserState } from "../../../redux/selectedUserState/slice";
import ToggleSign from "../ToggleSign";
import styles from "./Signin.module.css";
import MockAdapter from "axios-mock-adapter";

export default function Signin({ isLoginPage, toggleSign }) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errRef = useRef();
  const pwdRef = useRef();
  useEffect(() => {
    const mock = new MockAdapter(axios);
    mock.onPost("/signin").reply((config) => {
      console.log(config.data);
      return [
        200,
        {
          id: config.data.id,
          email: "email",
          accessToken: "QpwL5tke4Pnpja7X4",
          refreshToken: "QpwL5tke4Pnpja7X4",
        },
      ];
    });
    if (isError) {
      errRef.current.innerHTML =
        "아이디 또는 비밀번호를 잘못 입력했습니다.<br/>입력하신 내용을 다시 확인해주세요.";
      errRef.current.style.display = "block";
      setPwd("");
      pwdRef.current.value = "";
      pwdRef.current.focus();
      setIsError(false);
    }
  }, [isError]);
  const onLogIn = async function (e) {
    try {
      e.preventDefault();
      if (id === "" || pwd === "") {
        errRef.current.innerHTML =
          "<strong>아이디, 비밀번호</strong>를 입력해 주세요.";
        errRef.current.style.display = "block";
        return;
      }
      console.log(id, pwd);
      if (id !== "abc12345" || pwd !== "abc12345@") {
        console.log("??");
        throw new Error();
      }
      const res = await axios.post("/signin", {
        id: id,
        password: pwd,
      });
      console.log("data", res.data);
      dispatch(setSelectedUserState(true));
      navigate("/main");
    } catch (err) {
      console.log(err);
      setIsError(true);
      throw new Error(err);
    }
  };
  return (
    <>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="ID"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          ref={pwdRef}
        />
        <div className={styles.formLink}>
          <Link className={styles.forgotPW}>아이디 찾기</Link>
          <Link className={styles.forgotPW}>비밀번호 찾기</Link>
        </div>
        <div className={styles.err} ref={errRef}></div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <button onClick={onLogIn}>로그인</button>
        </div>
      </form>
      <ToggleSign isLoginPage={isLoginPage} toggleSign={toggleSign} />
    </>
  );
}
