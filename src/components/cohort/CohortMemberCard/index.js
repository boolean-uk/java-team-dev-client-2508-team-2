import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const CohortMemberCard = ({ profile, index }) => {
    if (!profile) return null;

    const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase();

    return (
        <div className="cohort-member-card">
            <div className={`member-avatar avatar-${index % 5}`}>{initials}</div>
            <Link to={`/users/${profile.id}/profile`} className="member-name">
                {profile.firstName} {profile.lastName}
            </Link>
        </div>
    );
};

export default CohortMemberCard;
