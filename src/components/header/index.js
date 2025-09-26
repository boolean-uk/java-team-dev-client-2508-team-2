import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/cogIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProfile } from '../../service/apiClient';

const Header = () => {
  const { user, token, onLogout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();
  const [initials, setInitials] = useState('');

  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (!token) {
    return null;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.id);
        setProfile(profileData || {});
        // console.log('Profile data:', profileData);
        setInitials(`${profileData?.firstName} ${profileData?.lastName}`.match(/\b(\w)/g));
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [user, token]);

  return (
    <header>
      <FullLogo textColour="white" />

      <div className="profile-icon" onClick={onClickProfileIcon}>
        <p>{initials}</p>
      </div>

      {isMenuVisible && (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>{initials}</p>
              </div>

              <div className="post-user-name">
                <p>
                  {profile.firstName} {profile.lastName}
                </p>
                <small>
                  {profile.user?.teacher
                    ? `${profile.jobTitle || 'Software Developer'}, Teacher`
                    : `${profile.user?.cohort?.name || 'Cohort'}, ${profile.specialisation?.name || ''}`}
                </small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to={`/users/${user.id}/profile`}>
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>Log out</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
