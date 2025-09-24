import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
// import AddIcon from '../../../assets/icons/addIcon';
import CohortIcon from '../../../assets/icons/cohortIcon';
// import CohortIconFill from '../../../assets/icons/cohortIcon-fill';
// import DeleteIcon from '../../../assets/icons/deleteIcon';
// import MonitorIcon from '../../../assets/icons/monitorIcon';
import ProfileIcon from '../../../assets/icons/profileIcon';
import SquareBracketsIcon from '../../../assets/icons/squareBracketsIcon';
import Menu from '../../menu';
import MenuItem from '../../menu/menuItem';
import './index.css';

const CohortMemberCard = ({ profile, index, subtitle, cohorts }) => {
  if (!profile) return null;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const editIconRef = useRef(null);

  const clickMoveCohort = (id) => {
    console.log('clicked move to cohrot ', id);
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
        <MenuItem icon={<ProfileIcon />} text="Profile" />
        {/* <MenuItem icon={<AddIcon />} text="Add note" /> */}

        <MenuItem icon={<CohortIcon />} text="Move to cohort">
          {cohorts.map((cohort, index) => (
            <MenuItem
              key={index}
              icon={<SquareBracketsIcon />}
              text={`${cohort.specialisation?.name}: ${cohort.name ?? 'cohort ' + cohort.id}`}
              onClick={() => clickMoveCohort(cohort.id)}
            />
          ))}
          {/* <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
            <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
            <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
            <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
          </MenuItem>

          <MenuItem icon={<MonitorIcon />} text="Frontend Development">
            <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
            <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
            <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
          </MenuItem> */}
        </MenuItem>

        {/* <MenuItem icon={<DeleteIcon />} text="Delete student" /> */}
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
