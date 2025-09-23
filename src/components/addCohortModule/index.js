import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import Form from '../../components/form';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import { createCohort } from '../../service/apiClient';
import './style.css';

const CohortCreation = ({ setLoading }) => {
  const { token } = useAuth();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const [specialisations, setSpecialisations] = useState([]);
  const [step] = useState(1);

  const [cohort, setCohort] = useState({
    name: '',
    startDate: '',
    endDate: '',
    specialisation: ''
  });

  useEffect(() => {
    const fetchSpecialisations = async () => {
      try {
        const res = await fetch(`http://localhost:4000/specialisations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const specialisationList = data.data?.specialisations || [];
        setSpecialisations(specialisationList);
      } catch (err) {
        console.error('Error fetching specialisations:', err);
      }
    };

    fetchSpecialisations();
  }, [token]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setCohort({
      ...cohort,
      [name]: value
    });
  };

  const onAddCohort = () => {
    createCohort(cohort.name, Number(cohort.specialisation), cohort.startDate, cohort.endDate)
      .then((res) => {
        const newCohortId = res.data.cohort.id;
        setLoading(true);

        navigate(`/cohort/${newCohortId}`);
        closeModal();
      })
      .catch((error) => {
        console.error('Error creating cohort:', error);
      });
  };

  const stepOne = () => (
    <>
      <Form className="welcome-form">
        <div className="add-cohorts-inputs">
          <TextInput onChange={onChange} value={cohort.name} name="name" label={'Cohort name*'} />

          <div className="filter-group-specialisation">
            <label>specialisation</label>
            <select name="specialisation" value={cohort.specialisation} onChange={onChange}>
              <option value="">Select a course</option>
              {specialisations.map((specialisation) => (
                <option key={specialisation.id} value={specialisation.id}>
                  {specialisation.name}
                </option>
              ))}
            </select>
          </div>

          <TextInput
            onChange={onChange}
            value={cohort.startDate}
            name="startDate"
            label="Start date"
            type="date"
          />

          <TextInput
            onChange={onChange}
            value={cohort.endDate}
            name="endDate"
            label="End date"
            type="date"
          />

          <p className="text-blue1">*Required</p>
        </div>
      </Form>

      <div className="stepper-buttons">
        <Button text="Cancel" classes="offwhite" onClick={() => closeModal()} />
        <Button
          text={'create cohort'}
          disabled={!cohort.name || !cohort.specialisation}
          classes="blue"
          onClick={() => onAddCohort()}
        />
      </div>
    </>
  );

  return <main className="add-cohort-main">{step === 1 && stepOne()}</main>;
};

export default CohortCreation;
