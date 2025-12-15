import { useEffect, useState } from 'react';
import { fetchMembers } from '../../api/fetchMembers';
import MemberCard from '../MemberCard/MemberCard';
import styles from './MemberList.module.scss';
import MemberInput from "../MemberInput/MemberInput";

export default function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers().then(setMembers);
  }, []);

  const handleAddMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <div className={styles.memberList}>
      <MemberInput onAdd={handleAddMember} />
      {members.map((member) => (
        <div key={member.id} className={styles.memberListItem}>
          <MemberCard {...member} />
        </div>
      ))}
    </div>
  );
}