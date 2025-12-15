import { useState } from "react";
import styles from "./MemberInput.module.scss";

export default function MemberInput({ onAdd }) {
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !mbti.trim()) return;

    const newMember = {
      id: Date.now(),
      name,
      mbti,
    };

    onAdd(newMember);
    setName("");
    setMbti("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름 입력"
      />
      <input
        type="text"
        value={mbti}
        onChange={(e) => setMbti(e.target.value)}
        placeholder="MBTI 입력"
      />
      <button type="submit">추가</button>
    </form>
  );
}