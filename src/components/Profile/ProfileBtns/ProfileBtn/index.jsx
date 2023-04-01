import styles from "./ProfileBtn.module.css";

export default function ProfileBtn({ src }) {
  return (
    <span className={styles.btn}>
      <img src={src} alt="Icon" />
    </span>
  );
}
