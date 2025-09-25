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
    cohort: '',
    specialisation: '',
    jobTitle: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const onAddStudent = () => {
    createUser(student)
      .then((res) => {
        setLoading(true);
        closeModal();
      })
      .catch((error) => {
        console.error('Error creating student:', error);
      });
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onAddStudent}>
        <StepOne data={student} setData={onChange} />
        <StepTwo data={student} setData={onChange} />
        <StepThree data={student} setData={onChange} />
        <StepFour data={student} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Add new student</h2>
      <p className="text-blue1">Create a new student profile</p>
    </div>
  );
};

export default AddStudentModal;
