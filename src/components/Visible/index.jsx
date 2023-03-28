import React, { useState } from "react";
export default function Visible() {
  const [visible, setVisible] = useState(false);
  return (
    <span
      onClick={() => setVisible(!visible)}
      className="material-symbols-outlined"
      style={{
        position: "absolute",
        fontSize: "1em",
        color: "#8b8b8b",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        padding: "5px",
      }}
    >
      {visible ? "visibility_off" : "visibility"}
    </span>
  );
}
