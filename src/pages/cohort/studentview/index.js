/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import CohortMemberList from '../../../components/cohort/cohortmemberlist';
import useAuth from '../../../hooks/useAuth';
import './index.css';

const CohortPage = () => {
    const { user } = useAuth();  // haal de ingelogde user op
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [cohortName, setCohortName] = useState("");
    const [loading, setLoading] = useState(true);

    const cohortId = user?.cohort?.id;

    useEffect(() => {
        if (!cohortId) return;

        const fetchCohort = async () => {
            try {
                const cohortRes = await fetch(`http://localhost:4000/cohorts/${cohortId}`);
                const cohortData = await cohortRes.json();
                if (cohortData.data) setCohortName(cohortData.data.cohort?.name || "Cohort");

                const studentsRes = await fetch(`http://localhost:4000/cohorts/${cohortId}/students`);
                const studentsData = await studentsRes.json();
                setStudents(studentsData.data?.profiles || []);

                const teachersRes = await fetch(`http://localhost:4000/cohorts/teachers`);
                const teachersData = await teachersRes.json();
                setTeachers(
                    teachersData.data?.profiles?.filter(t => t.user?.cohort?.id === cohortId) || []
                );

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCohort();
    }, [cohortId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="cohort-page">
            <h2>{cohortName}</h2>
            <CohortMemberList members={students} title="Students" />
            <CohortMemberList members={teachers} title="Teachers" />
            {/* TODO: Add statistics section here */}
        </div>
    );
};

export default CohortPage;
