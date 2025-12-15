import ThemeProvider from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import MemberList from "./components/MemberList.jsx/MemberList";

export default function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeToggle />
        <h1>👥 IUI2팀 팀원 소개</h1>
        <MemberList />
      </div>
    </ThemeProvider>
  );
}
