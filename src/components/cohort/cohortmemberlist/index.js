import React from 'react';
import CohortMemberCard from '../CohortMemberCard';
import './index.css';
import CohortIcon from '../../../assets/icons/cohortIconSpecialisationIcon';

const CohortMemberList = ({ members, title, tracks, cohort, cohorts }) => {
  return (
    <div className="cohort-member-list">
      {title === 'Students' && (
        <div className="cohort-page-container">
          <div className="cohort-page-memberlist">
            <CohortIcon specialisation={cohort.specialisation.id} />
            <div className="cohort-details">
              <div className="cohort-header">
                <p className="cohort-track">{cohort.specialisation.name}, </p>
                <span className="cohort-name">{cohort?.name}</span>
              </div>
              <p className="cohort-dates">
                {cohort.startDate && cohort.endDate
                  ? `${cohort.startDate} – ${cohort.endDate}`
                  : 'No dates set'}
              </p>
            </div>
          </div>
        </div>
      )}

      {(!members || members.length === 0) && <p>No {title.toLowerCase()} found</p>}

      <div className={`member-grid ${title}`}>
        {members.map((member, index) => (
          <CohortMemberCard
            key={member.id}
            profile={member}
            index={index}
            subtitle={tracks ? tracks[member.id] : null}
            cohorts={cohorts}
          />
        ))}
      </div>
    </div>
  );
};

export default CohortMemberList;
