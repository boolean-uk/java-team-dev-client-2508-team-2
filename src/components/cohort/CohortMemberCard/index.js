import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const CohortMemberCard = ({ profile }) => {
    if (!profile) return null;

    return (
        <div className="cohort-member-card">
            <Link to={`/users/${profile.user.id}/profile`}>
                <p>{profile.firstName} {profile.lastName}</p>
            </Link>
        </div>
    );
};

export default CohortMemberCard;
