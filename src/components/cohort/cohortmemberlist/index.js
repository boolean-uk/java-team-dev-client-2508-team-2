import React from 'react';
import CohortMemberCard from '../CohortMemberCard';
import './index.css';
import CohortIcon from '../../../assets/icons/cohortIconSpecialisationIcon';

const CohortMemberList = ({ members, title, tracks, cohortId, cohortName, specialisationId }) => {
  if (!members || members.length === 0) return <p>No {title.toLowerCase()} found</p>;

  return (
    <div className="cohort-member-list">
      {title === 'Students' && (
        <div className="cohort-page-container">
          <div className="cohort-page-memberlist">
            <CohortIcon specialisation={specialisationId} />
            <div className="cohort-details">
              <div className="cohort-header">
                <p className="cohort-track">{cohortName}, </p>
                <span className="cohort-name">Cohort {cohortId}</span>
              </div>
              <p className="cohort-dates">January 2023 – June 2023</p>
            </div>
          </div>
        </div>
      )}

      <div className="member-grid">
        {members.map((member, index) => (
          <CohortMemberCard
            key={member.id}
            profile={member}
            index={index}
            subtitle={tracks ? tracks[member.id] : null}
          />
        ))}
      </div>
    </div>
  );
};

export default CohortMemberList;
