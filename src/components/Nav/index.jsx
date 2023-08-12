import React from "react";
import Button from "../Button";
import styles from "./Nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const { selectedUserInfo } = useSelector((state) => state);
  const onClick = () => {
    if (selectedUserInfo.id) navigate("/main");
    else navigate("/login");
  };
  console.log(selectedUserInfo);
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div>
          <Link to="/" className={styles.logo}>
            <img src="/images/webrtc_icon_138017.svg" alt="webrtc" />
            <p>Study Hub</p>
          </Link>
        </div>
        <div>
          <Button
            width={"113px"}
            height={"40px"}
            backgroundColor={"#ff7272"}
            text={"Open StudyHub"}
            color={"#fff"}
            onClick={onClick}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
