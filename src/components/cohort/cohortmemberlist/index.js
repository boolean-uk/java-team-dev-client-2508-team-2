import { useRef, useState } from 'react';
import CohortMemberCard from '../CohortMemberCard';
import './index.css';
import CohortIcon from '../../../assets/icons/cohortIconSpecialisationIcon';
import AddStudentModal from '../../addStudentModal';
import Menu from '../../menu';
import MenuItem from '../../menu/menuItem';
import AddIcon from '../../../assets/icons/addIcon';
import DeleteIcon from '../../../assets/icons/deleteIcon';
import useModal from '../../../hooks/useModal';

const CohortMemberList = ({ members, title, tracks, cohort, cohorts, setLoading }) => {
  const { openModal, setModal } = useModal();
  const [isCohortMenuVisible, setIsCohortMenuVisible] = useState(false);
  const editIconRef = useRef(null);

  const showAddStudentModal = () => {
    console.log('clicked');
    setModal('Add student', <AddStudentModal />);
    openModal();
  };

  const CohortMenu = ({ anchorRef }) => {
    if (!anchorRef?.current) return null;

    const rect = anchorRef.current.getBoundingClientRect();

    return (
      <Menu
        style={{
          position: 'absolute',
          top: rect.bottom + window.scrollY,
          left: rect.right + window.scrollX - 392,
          zIndex: 9999
        }}
      >
        <MenuItem icon={<AddIcon />} text="Add new student" onClick={showAddStudentModal} />
        <MenuItem icon={<DeleteIcon />} text="Delete cohort" />
      </Menu>
    );
  };

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
            <div
              className="menu-icon last"
              onClick={() => setIsCohortMenuVisible(!isCohortMenuVisible)}
              ref={editIconRef}
            >
              <p>...</p>
              {isCohortMenuVisible && <CohortMenu anchorRef={editIconRef} />}
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
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default CohortMemberList;
