import Button from '../../../components/button';
import SquareBracketsIcon from '../../../assets/icons/squareBracketsIcon';
import { useParams, useNavigate } from 'react-router-dom';

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
            <div className="cohort-avatar">
              <SquareBracketsIcon background="rgba(249, 251, 252, 1)" />
            </div>
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
