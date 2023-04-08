import { useDispatch } from "react-redux";
import { onSelectedProfileIcon } from "../../../../redux/selectedProfileIcon/slice";
import styles from "./ProfileBtn.module.css";

export default function ProfileBtn({ src, index }) {
  const dispatch = useDispatch();
  return (
    <span className={styles.btn}>
      <img
        src={src}
        alt="Icon"
        onClick={() => {
          dispatch(onSelectedProfileIcon(index));
        }}
      />
    </span>
  );
}
