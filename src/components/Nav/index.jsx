import React from "react";
import Button from "../Button";
import styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div>
          <a href="/" className={styles.logo}>
            <img src="/images/webrtc_icon_138017.svg" />
            <p>Study Hub</p>
          </a>
        </div>
        <div>
          <Button
            width={113}
            height={40}
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
