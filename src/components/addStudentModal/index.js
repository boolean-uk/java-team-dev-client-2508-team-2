import useModal from '../../hooks/useModal';
import { useState } from 'react';
import { createUser } from '../../service/apiClient';
import Stepper from '../../components/stepper';
import StepOne from '../profileCreationSteps/stepOne';
import StepTwo from '../profileCreationSteps/stepTwo';
import StepThree from '../profileCreationSteps/stepThree';
import StepFour from '../profileCreationSteps/stepFour';

const AddStudentModal = ({ setLoading }) => {
  const { closeModal } = useModal();

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    githubUrl: '',
    bio: '',
    email: '',
    password: '',
    cohortId: 0,
    specialisationId: 0,
    jobTitle: ''
  });
  const [err, setErr] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const onAddStudent = () => {
    if (
      student.firstName === '' ||
      student.lastName === '' ||
      student.email === '' ||
      student.password === ''
    ) {
      setErr('You are missing a required field');
      setTimeout(() => setErr(''), 3000);
      return;
    }
    createUser(student)
      .then((res) => {
        closeModal();
      })
      .catch((error) => {
        setErr(error.message);
        setTimeout(() => setErr(''), 3000);
      });
  };

  return (
    <>
      <Stepper onComplete={onAddStudent} errorMessage={err}>
        <StepOne data={student} setData={onChange} />
        <StepTwo data={student} setData={onChange} locked={false} />
        <StepThree data={student} setData={onChange} locked={false} />
        <StepFour data={student} setData={onChange} />
      </Stepper>
    </>
  );
};

export default AddStudentModal;
