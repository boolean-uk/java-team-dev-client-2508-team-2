import React from 'react';
import useAuth from '../../hooks/useAuth';
import './index.css';
import CohortPageTeacher from './teacherview';
import CohortPageStudent from './studentview';

const CohortPage = () => {
  const { user } = useAuth();

  if (user?.roles?.some((role) => role.name === 'ROLE_TEACHER')) {
    return <CohortPageTeacher />;
  } else {
    return <CohortPageStudent />;
  }
};

export default CohortPage;
