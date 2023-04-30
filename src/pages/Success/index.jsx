import React from "react";
import styles from "./Success.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>회원가입을 성공적으로 완료하였습니다.</h1>
      <Button
        text={"로그인 페이지로"}
        width={"120px"}
        height={"45px"}
        backgroundColor={"#ff7272"}
        color={"#e7e7e7"}
        onClick={() => {
          navigate("/login");
        }}
      />
    </div>
  );
};

export default Success;
