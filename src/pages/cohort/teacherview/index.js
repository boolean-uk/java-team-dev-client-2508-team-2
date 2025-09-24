import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Card from '../../../components/card';
import './index.css';
import CohortList from '../../../components/cohort/CohortList';
import StudentInfo from '../../../components/teacher/studentinfo';
import CohortMemberList from '../../../components/cohort/cohortmemberlist';
import { useParams } from 'react-router-dom';
import DeliveryLogs from '../../../components/teacher/deliverylogs';
import CohortListNoAdd from '../../../components/cohort/CohortListNoAdd';
import CohortHeader from '../../../components/cohort/CohortHeader';

const CohortPageTeacher = () => {
  const { cohortId } = useParams();
  const { token } = useAuth();

  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const cohort = cohorts.find((c) => c.id === Number(cohortId));

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const cohortRes = await fetch(`http://localhost:4000/cohorts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const cohortsJson = await cohortRes.json();
        setCohorts(cohortsJson.data.cohorts || []);

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
  }, [token, cohortId, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="teacher-main">
      <div className="teacher-cohorts">
        <Card>
          <h2 className="cohorts-title">Cohorts</h2>
          <div className="cohortspage-row">
            <CohortList cohorts={cohorts} setLoading={setLoading} />
            <CohortMemberList members={students} title="Students" cohort={cohort || {}} />
          </div>
        </Card>
      </div>

      <div className="teacher-content">
        <StudentInfo />
      </div>

      <div className="teacher-logs">
        <Card>
          <div className="logs-header">
            <h2>Delivery Logs</h2>
            <div className="logs-header-actions">
              <input
                type="text"
                placeholder="Search logs"
                className="logs-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="logs-layout">
            <div className="logs-cohorts">
              <h3>Cohorts</h3>
              <CohortListNoAdd cohorts={cohorts} />
            </div>
            <div className="logs-delivery">
              <div className="logs-subheader">
                {cohort && (
                  <>
                    <CohortHeader cohort={cohort} />
                    <button className="add-btn" onClick={() => setShowLogForm((prev) => !prev)}>
                      {showLogForm ? '×' : '+'}
                    </button>
                  </>
                )}
              </div>
              <DeliveryLogs
                cohortId={cohortId}
                showForm={showLogForm}
                setShowForm={setShowLogForm}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default CohortPageTeacher;
