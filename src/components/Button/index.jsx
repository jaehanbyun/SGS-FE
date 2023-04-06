import React from "react";
import styles from "./Button.module.css";

const Button = ({
  text,
  onClick,
  width,
  height,
  backgroundColor,
  color,
  fontsize,
  fontweight = 400,
}) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: `${backgroundColor}`,
    color: `${color}`,
    fontSize: `${fontsize}px`,
    fontWeight: `${fontweight}`,
  };
  return (
    <button className={styles.btn} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
