import ProfileBtn from "./ProfileBtn";
import styles from "./ProfileBtns.module.css";
const profileButtons = [
  "/images/calendar.svg",
  "/images/chart.svg",
  "/images/setting.svg",
  "/images/logout.svg",
];
export default function ProfileBtns() {
  return (
    <div className={styles.btns}>
      {profileButtons.map((pb, index) => (
        <ProfileBtn key={pb} src={pb} index={index} />
      ))}
    </div>
  );
}
