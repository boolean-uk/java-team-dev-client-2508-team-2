import React from 'react';
import CohortMemberCard from '../CohortMemberCard';
import './index.css';

const CohortMemberList = ({ members, title, tracks }) => {
  if (!members || members.length === 0) return <p>No {title.toLowerCase()} found</p>;

  return (
    <div className="cohort-member-list">
      <h3>{title}</h3>
      <div className="member-grid">
        {members.map((member, index) => (
          <CohortMemberCard key={member.id} profile={member} index={index} subtitle={tracks ? tracks[member.id] : null} />
        ))}
      </div>
    </div>
  );
};

export default CohortMemberList;
