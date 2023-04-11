import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "../../../hooks";
import { offSelectedProfileIcon } from "../../../redux/selectedProfileIcon/slice";
import { setSelectedUserState } from "../../../redux/selectedUserState/slice";
import Button from "../../Button";
import styles from "./LogOutModal.module.css";

const LogOutModal = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  useOnClickOutside(ref, () => {
    dispatch(offSelectedProfileIcon());
  });
  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <h1>로그아웃</h1>
          </div>
          <div className={styles.middle}>
            <p>정말로 로그아웃 하시겠어요?</p>
          </div>
          <div className={styles.bottom}>
            <Button
              width={"96px"}
              height={"38px"}
              text={"로그아웃"}
              backgroundColor={"#da373c"}
              color={"#fff"}
              fontsize={14}
              onClick={() => {
                dispatch(offSelectedProfileIcon());
                dispatch(setSelectedUserState(false));
              }}
            />
            <Button
              width={"96px"}
              height={"38px"}
              text={"취소"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={14}
              onClick={() => dispatch(offSelectedProfileIcon())}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
