import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedUserState } from "../../../redux/selectedUserState/slice";
import Input from "../Input";

import ToggleSign from "../ToggleSign";
import styles from "./Signin.module.css";

export default function Signin({ isLoginPage, toggleSign }) {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLoggin = async function (e) {
    try {
      e.preventDefault();
      const res = await axios.post("https://reqres.in/api/login", {
        email: id,
        password: pwd,
      });
      console.log(res);
      dispatch(setSelectedUserState(true));
      navigate("/main");
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
  return (
    <>
      <form className={styles.form}>
        <Input
          type="text"
          placeholder="ID"
          onChange={(e) => {
            setId(e.target.value);
            console.log(id);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPwd(e.target.value);
            console.log(pwd);
          }}
        />
        <div className={styles.formLink}>
          <Link className={styles.forgotPW}>아이디 찾기</Link>
          <Link className={styles.forgotPW}>비밀번호 찾기</Link>
        </div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <button onClick={onLoggin}>로그인</button>
        </div>
      </form>
      <ToggleSign isLoginPage={isLoginPage} toggleSign={toggleSign} />
    </>
  );
}
