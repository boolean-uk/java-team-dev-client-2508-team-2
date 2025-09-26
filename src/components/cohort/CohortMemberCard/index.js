import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import CohortIcon from '../../../assets/icons/cohortIcon';
import ProfileIcon from '../../../assets/icons/profileIcon';
import SquareBracketsIcon from '../../../assets/icons/squareBracketsIcon';
import Menu from '../../menu';
import MenuItem from '../../menu/menuItem';
import './index.css';
import { setCohort } from '../../../service/apiClient';

const CohortMemberCard = ({ profile, index, subtitle, cohorts, setLoading }) => {
  if (!profile) return null;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const editIconRef = useRef(null);

  const clickMoveCohort = (cohortId) => {
    setCohort(profile.id, cohortId);
    setIsMenuVisible(false);
    setLoading(true);
  };

  const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase();

  const CascadingEditMenu = ({ anchorRef }) => {
    if (!anchorRef?.current) return null;

    const rect = anchorRef.current.getBoundingClientRect();

    return createPortal(
      <Menu
        className="edit-circle-menu"
        style={{
          position: 'absolute',
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          zIndex: 9999
        }}
      >
        <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={`/users/${profile.id}/profile`} />

        <MenuItem icon={<CohortIcon />} text="Move to cohort">
          {cohorts
            // .filter((cohort) => cohort.id !== profile.cohort.id)
            .map((cohort) => (
              <MenuItem
                key={cohort.id}
                icon={<SquareBracketsIcon />}
                text={`${cohort.specialisation?.name}: ${cohort.name ?? 'cohort ' + cohort.id}`}
                onClick={() => clickMoveCohort(cohort.id)}
              />
            ))}
        </MenuItem>
      </Menu>,
      document.body
    );
  };

  return (
    <div className="cohort-member-card">
      <div className={`member-avatar avatar-${index % 5}`}>{initials}</div>
      <div className="member-info">
        <Link to={`/users/${profile.id}/profile`} className="member-name">
          {profile.firstName} {profile.lastName}
        </Link>
        {subtitle && <p className="member-subtitle">{subtitle}</p>}
      </div>
      <div className="edit-icon" ref={editIconRef}>
        <p
          onClick={() => {
            setIsMenuVisible(!isMenuVisible);
          }}
        >
          ...
        </p>
        {isMenuVisible && <CascadingEditMenu anchorRef={editIconRef} />}
      </div>
    </div>
  );
};

export default CohortMemberCard;
