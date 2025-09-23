import CohortIcon from '../../../assets/icons/cohortIconSpecialisationIcon';
import Button from '../../../components/button';
import { useParams, useNavigate } from 'react-router-dom';
import useModal from '../../../hooks/useModal';
import './index.css';
import CohortCreation from '../../addCohortModule';

const CohortList = ({ cohorts }) => {
  const { openModal, setModal } = useModal();

  const { cohortId } = useParams();
  const navigate = useNavigate();

  const addCohortModal = () => {
    setModal('Add Cohort', <CohortCreation />);
    openModal();
  };

  return (
    <div className="cohort-list-container">
      <Button classes="offwhite cohort" text="add cohort" onClick={addCohortModal} />

      <div className="cohort-list">
        {cohorts.map((cohort) => (
          <div
            className={`cohort-page ${cohort.id === Number(cohortId) ? 'active' : ''}`}
            key={cohort.id}
            onClick={() => navigate(`/cohort/${cohort.id}`)}
          >
            <CohortIcon specialisation={cohort.specialisation.id} />
            <div className="cohort-details">
              <p className="cohort-name">{cohort.specialisation.name}</p>
              <small>{cohort.name}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CohortList;
