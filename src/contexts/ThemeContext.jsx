import { createContext, useState } from "react";

// Context 생성
export const ThemeContext = createContext();

// Provider 컴포넌트
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // theme 변경 함수
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 전역으로 제공할 값
  const value = { theme, setTheme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
