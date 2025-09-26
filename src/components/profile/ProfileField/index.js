import React from 'react';
import './index.css';

const ProfileField = ({ label, value, editable, onChange, textarea }) => {
  return (
    <div className="profile-field">
      {label && <label className="profile-label">{label}</label>}
      {editable ? (
        textarea ? (
          <textarea value={value || ''} onChange={onChange} className="profile-textarea" />
        ) : (
          <input type="text" value={value || ''} onChange={onChange} className="profile-input" />
        )
      ) : textarea ? (
        <div className="profile-textarea readonly">{value || '—'}</div>
      ) : (
        <div className="profile-input readonly">{value || '—'}</div>
      )}
    </div>
  );
};

export default ProfileField;
