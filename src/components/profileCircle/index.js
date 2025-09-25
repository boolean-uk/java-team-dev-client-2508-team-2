import { useNavigate } from 'react-router-dom';

import './style.css';

const ProfileCircle = ({ initials, userId = '1' }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-circle" onClick={() => navigate(`/users/${userId}/profile`)}>
      <div className="profile-icon">
        <p>{initials}</p>
      </div>
    </div>
  );
};

export default ProfileCircle;
