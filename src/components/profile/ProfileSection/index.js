import React from 'react';
import './index.css';

const ProfileSection = ({ title, children }) => (
  <div className="profile-section">
    <h2>{title}</h2>
    <div className="profile-section-content">{children}</div>
  </div>
);

export default ProfileSection;
