import { useEffect, useState } from 'react';
import Form from '../../form';
import TextInput from '../../form/textInput';
import get from '../../../service/apiClient';

const StepThree = ({ data, setData, locked = true }) => {
  const [specialisations, setSpecialisations] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [filteredCohorts, setFilteredCohorts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await get('/api/specialisations');
      setSpecialisations(result);
      const cohortResult = await get('/api/cohorts');
      setCohorts(cohortResult);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCohorts(
      cohorts.filter((cohort) => cohort.specialisationId === Number(data.specialisation))
    );
  }, [data.specialisation, cohorts]);

  return (
    <>
      <div className="welcome-formheader">
        <h3>Training info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={'Student'}
            name="role"
            label={'Role*'}
            type={'locked'}
          />
          <div className="filter-group-specialisation">
            <label>Specialisation</label>
            <select name="specialisation" value={data.specialisation} onChange={setData}>
              <option value="">Select a course</option>
              {specialisations.map((specialisation) => (
                <option key={specialisation.id} value={specialisation.id}>
                  {specialisation.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group-specialisation">
            <label>Cohort</label>
            <select name="cohort" value={data.cohort} onChange={setData}>
              <option value="">Select a cohort</option>
              {filteredCohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
            </select>
          </div>
          <TextInput
            value={cohorts.find((c) => c.id === Number(data.cohort))?.startDate || 'Not assigned'}
            name="startDate"
            label={'Start Date*'}
            type={'locked'}
          />
          <TextInput
            value={cohorts.find((c) => c.id === Number(data.cohort))?.endDate || 'Not assigned'}
            name="endDate"
            label={'End Date*'}
            type={'locked'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
