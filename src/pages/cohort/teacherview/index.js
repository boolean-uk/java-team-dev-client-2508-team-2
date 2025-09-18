import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Card from '../../../components/card';
import './index.css';
import CohortList from '../../../components/cohort/CohortList';

const CohortPageTeacher = () => {
  const { token } = useAuth();
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
          <CohortList cohorts={cohorts} />
        </Card>
      </main>
    </>
  );
};

export default CohortPageTeacher;
