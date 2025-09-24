import React, { useEffect, useState } from 'react';
import Card from '../../card';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import './index.css';
import TickIcon from '../../../assets/tickIcon';
import NotTickIcon from '../../../assets/notTickIcon';
import NotesPanel from '../notes';

const StudentInfo = () => {
  const { token } = useAuth();
  const { cohortId } = useParams();

  const [students, setStudents] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [openUnits, setOpenUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [exercisesData, setExercisesData] = useState([]);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const res = await fetch(`http://localhost:4000/cohorts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const cohortList = data.data?.cohorts || [];
        setCohorts(cohortList);

        if (cohortList.length > 0) {
          const first = cohortList.find((c) => c.id === Number(cohortId)) || cohortList[0];
          setSelectedCohort(first.id);
          setSelectedCourse(first.specialisation?.id || '');
        }
      } catch (err) {
        console.error('Error fetching cohorts:', err);
      }
    };

    fetchCohorts();
  }, [token, cohortId]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCohort) return;
      try {
        const res = await fetch(`http://localhost:4000/cohorts/${selectedCohort}/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const profiles = (data.data?.profiles || []).map((s) => ({
          ...s,
          cohortId: selectedCohort,
          course: cohorts.find((c) => c.id === selectedCohort)?.specialisation?.name || ''
        }));
        setStudents(profiles);

        if (profiles.length > 0) {
          setSelectedStudent(profiles[0].id);
        } else {
          setSelectedStudent('');
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedCohort, cohorts, token]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!selectedStudent) return;
      try {
        const res = await fetch(`http://localhost:4000/users/${selectedStudent}/exercises`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const userExercises = data.data?.userExercises || [];
        setExercisesData(userExercises);
      } catch (err) {
        console.error('Error fetching exercises:', err);
      }
    };

    fetchExercises();
  }, [selectedStudent, token]);

  if (loading) return <p>Loading student info...</p>;

  const selectedStudentData = students.find((s) => s.id === selectedStudent);

  return (
    <Card>
      <div className="student-info-header">
        <h3>Student info</h3>
        <input type="text" placeholder="Search for people" />
      </div>

      <div className="student-info-filters">
        <div className="filter-group">
          <label>Course</label>
          <select value={selectedCourse} disabled>
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.specialisation.id}>
                {cohort.specialisation.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Cohort</label>
          <select
            value={selectedCohort}
            onChange={(e) => {
              const cohortId = Number(e.target.value);
              setSelectedCohort(cohortId);
              const found = cohorts.find((c) => c.id === cohortId);
              if (found) {
                setSelectedCourse(found.specialisation.id);
              }
            }}
          >
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                Cohort {cohort.id}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Student</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(Number(e.target.value))}
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="student-info-content">
        <div className="cohort-exercises">
          <h4>Cohort Exercises</h4>
          <div className="course-section">
            <label>Course</label>
            <p>
              {cohorts.find((c) => c.specialisation.id === selectedCourse)?.specialisation?.name ||
                'Software Development'}
            </p>
          </div>

          <div className="module-block">
            <div className="module-section">
              <label>Module</label>
              <p>Exercises</p>
            </div>

            <div className="units-grid">
              {exercisesData.map((userExercise) => {
                const unitName = userExercise.exercise?.unit?.name || 'Unknown Unit';
                const exerciseName = userExercise.exercise?.name || 'Unknown Exercise';

                return (
                  <div key={`${unitName}-${userExercise.id}`} className="unit-section">
                    <div
                      className="unit-header"
                      onClick={() =>
                        setOpenUnits((prev) =>
                          prev.includes(unitName)
                            ? prev.filter((u) => u !== unitName)
                            : [...prev, unitName]
                        )
                      }
                    >
                      <span className="unit-label">Unit</span>
                      <div className="unit-title">
                        <p>{unitName}</p>
                        <span className="unit-arrow">
                          {openUnits.includes(unitName) ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {openUnits.includes(unitName) && (
                      <ul className="exercise-list">
                        <li
                          key={userExercise.id}
                          className={userExercise.status ? 'completed' : 'not-completed'}
                        >
                          <span className="exercise-status">
                            {userExercise.status ? (
                              <TickIcon height={16} width={16} />
                            ) : (
                              <NotTickIcon height={16} width={16} />
                            )}
                          </span>
                          {exerciseName}
                        </li>
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <NotesPanel student={selectedStudentData} />
      </div>
    </Card>
  );
};

export default StudentInfo;
