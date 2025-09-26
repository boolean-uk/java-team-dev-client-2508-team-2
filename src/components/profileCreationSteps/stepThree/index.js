import { useEffect, useState } from 'react';
import Form from '../../form';
import TextInput from '../../form/textInput';
import { get } from '../../../service/apiClient';
import './style.css';

const StepThree = ({ data, setData, locked = true }) => {
  const [specialisations, setSpecialisations] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [filteredCohorts, setFilteredCohorts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await get('specialisations');
      setSpecialisations(result.data.specialisations);
      const cohortResult = await get('cohorts');
      setCohorts(cohortResult.data.cohorts || []);
    };
    fetchData();
  }, []);

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
          {locked ? (
            <TextInput
              onChange={setData}
              value={data.specialisation}
              name="specialisation"
              label={'Specialisation*'}
              type={'locked'}
            />
          ) : (
            <div className="inputwrapper">
              <label>Specialisation</label>
              <select
                className="dropdown"
                name="specialisationId"
                value={data.specialisationId}
                onChange={(e) => {
                  setData(e);
                  setFilteredCohorts(
                    cohorts.filter((cohort) => cohort.specialisation.id === Number(e.target.value))
                  );
                }}
              >
                <option value="">Select a course</option>
                {specialisations.map((specialisation) => (
                  <option key={specialisation.id} value={specialisation.id}>
                    {specialisation.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {locked ? (
            <TextInput
              onChange={setData}
              value={data.cohort}
              name="cohort"
              label={'Cohort*'}
              type={'locked'}
            />
          ) : (
            <div className="inputwrapper">
              <label>Cohort</label>
              <select className="dropdown" name="cohortId" value={data.cohort} onChange={setData}>
                <option value="">Select a cohort</option>
                {filteredCohorts.map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
