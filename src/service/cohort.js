import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export const getStudentsByCohortId = async (cohortId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${API_URL}/${cohortId}/students`, config);
  return response.data.data.profiles;
};

export const getTeachers = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${API_URL}/teachers`, config);
  return response.data.data.profiles;
};
