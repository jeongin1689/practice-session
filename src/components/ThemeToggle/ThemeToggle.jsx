import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleBox} >
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className={styles.text}>
          {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </span>
      </label>
    </div>
  );
}
