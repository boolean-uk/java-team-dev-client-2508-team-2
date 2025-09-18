import CohortIcon from '../../../assets/icons/cohortIconSpecialisationIcon';
import Button from '../../../components/button';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const CohortList = ({ cohorts }) => {
  const { cohortId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Button text="add cohort" onClick={() => alert('Create Cohort clicked!')} />

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
              <small>cohort {cohort.id}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CohortList;
