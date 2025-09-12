import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import './style.css';
import StepThree from './stepThree';
import StepFour from './stepFour';

const Welcome = () => {
  const { onCreateProfile, user } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: user.email,
    phone: '',
    password: user.password,
    githubUsername: '',
    bio: '',
    role: 'Student',
    specialism: 'Software Developer',
    cohort: 'Cohort 4',
    startDate: 'January 2023',
    endDate: 'June 2023'
  });

  const [canStep, setCanStep] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });

    if (profile.firstName && profile.lastName) {
      setCanStep(true);
    }
  };

  const onComplete = () => {
    onCreateProfile(profile.firstName, profile.lastName, profile.githubUsername, profile.bio);
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete} stepCondition={canStep}>
        <StepOne data={profile} setData={onChange} />
        <StepTwo data={profile} setData={onChange} />
        <StepThree data={profile} setData={onChange} />
        <StepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;
