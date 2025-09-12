import React, { useEffect, useState } from 'react';
import CohortMemberList from '../../../components/cohort/cohortmemberlist';
import useAuth from '../../../hooks/useAuth';
import './index.css';

const CohortPage = () => {
    const { token } = useAuth();
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [cohortName, setCohortName] = useState('');
    const [loading, setLoading] = useState(true);

    const cohortId = 1;

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
        <div className="cohort-page">
            <h2>{cohortName}</h2>
            <CohortMemberList members={students} title="Students" />
            <CohortMemberList members={teachers} title="Teachers" />
        </div>
    );
};

export default CohortPage;
