import React, { useEffect, useRef } from "react";

const GroupItem = ({ group, isActive, onClick }) => {
  const ref = useRef();
  useEffect(() => {
    if (isActive === true) {
      ref.current.classList.add("active--channel");
    } else {
      ref.current.classList.remove("active--channel");
    }
  }, [isActive]);
  return (
    <div>
      <div ref={ref} className="item" onClick={onClick}>
        <img
          src={group.roomImage}
          className="logo"
          alt={`${group.roomName}icon`}
        />
        <p>{group.roomName}</p>
      </div>
    </div>
  );
};

export default GroupItem;
