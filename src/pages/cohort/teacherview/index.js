import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Card from '../../../components/card';
import './index.css';
import Button from '../../../components/button';
import SquareBracketsIcon from '../../../assets/icons/squareBracketsIcon';

const CohortPageTeacher = () => {
  const { token } = useAuth();
  const { cohortId } = useParams();
  const navigate = useNavigate();
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const cohortRes = await fetch(`http://localhost:4000/cohorts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const cohortsJson = await cohortRes.json();
        setCohorts(cohortsJson.data.cohorts || []);
      } catch (err) {
        console.error('Error fetching cohort:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCohorts();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <main>
        <Card>
          <h2>Cohorts</h2>
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
        </Card>
      </main>
    </>
  );
};

export default CohortPageTeacher;
