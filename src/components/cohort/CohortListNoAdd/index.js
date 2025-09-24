import CohortIcon from '../../../assets/icons/cohortIconSpecialisationIcon';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const CohortListNoAdd = ({ cohorts }) => {
    const { cohortId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="cohort-list-container">
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

export default CohortListNoAdd;
