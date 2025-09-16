import React, { useEffect, useState } from 'react';
import CohortMemberList from '../../../components/cohort/cohortmemberlist';
import useAuth from '../../../hooks/useAuth';
import Card from '../../../components/card';
import './index.css';

const CohortPage = () => {
    const { user, token } = useAuth();
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [cohortName, setCohortName] = useState('');
    const [loading, setLoading] = useState(true);

    const cohortId = user?.cohort?.id;

    useEffect(() => {
        if (!cohortId || !token) return;

        const fetchCohort = async () => {
            try {
                // fetch students
                const studentsRes = await fetch(`http://localhost:4000/cohorts/${cohortId}/students`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const studentsData = await studentsRes.json();
                console.log('Fetched students data:', studentsData);
                setStudents(studentsData.data?.profiles || []);

                // fetch teachers
                const teachersRes = await fetch(`http://localhost:4000/cohorts/teachers`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const teachersData = await teachersRes.json();
                console.log('Fetched teachers data:', teachersData);
                setTeachers(teachersData.data?.profiles || []);

                setCohortName(`Cohort ${cohortId}`);
            } catch (err) {
                console.error('Error fetching cohort:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCohort();
    }, [cohortId, token]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <main>
                <Card>
                    <h2>My Cohort</h2>

                    {/* Cohort info blok */}
                    <div className="cohort-page">
                        <div className="cohort-avatar">C{cohortId}</div>
                        <div className="cohort-details">
                            <p className="cohort-name">{cohortName}</p>
                        </div>
                    </div>

                    <CohortMemberList members={students} title="Students" />
                </Card>
            </main>

            <aside>
                <Card>
                    <CohortMemberList members={teachers} title="Teachers" />
                </Card>
            </aside>
        </>
    );
};

export default CohortPage;
