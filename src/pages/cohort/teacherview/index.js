import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Card from '../../../components/card';
import './index.css';
import CohortList from '../../../components/cohort/CohortList';
// import TickIcon from '../../../assets/tickIcon';
import CohortMemberList from '../../../components/cohort/cohortmemberlist';
import { useParams } from 'react-router-dom';

const CohortPageTeacher = () => {
  const { cohortId } = useParams();

  const { token } = useAuth();
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const cohort = cohorts.find((c) => c.id === Number(cohortId));

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const cohortRes = await fetch(`http://localhost:4000/cohorts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const cohortsJson = await cohortRes.json();
        setCohorts(cohortsJson.data.cohorts || []);

        // fetch students
        const studentsRes = await fetch(`http://localhost:4000/cohorts/${cohortId}/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const studentsData = await studentsRes.json();
        setStudents(studentsData.data?.profiles || []);
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
          <h2 className="cohorts-title">Cohorts</h2>
          <div className="cohortspage-row">
            <CohortList cohorts={cohorts} />

            <CohortMemberList
              members={students}
              title="Students"
              cohortName={cohort?.name}
              cohortSpeciality={cohort?.specialisation?.name}
              specialisationId={cohort?.specialisation?.id}
            />
          </div>
        </Card>
      </main>
    </>
  );
};

export default CohortPageTeacher;
