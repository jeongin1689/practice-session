import { useTheme } from "../../hooks/useTheme";
import styles from "./MemberCard.module.scss";

export default function MemberCard({ name, mbti }) {
  const { theme } = useTheme(); // 전역 theme 상태 불러오기

  return (
    <div
      className={`${styles.card} ${
        theme === "dark" ? styles.darkCard : styles.lightCard
      }`}
    >
      <strong>{name}</strong>
      <p>MBTI: {mbti}</p>
    </div>
  );
}
