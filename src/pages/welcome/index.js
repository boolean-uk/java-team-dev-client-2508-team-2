import { useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from '../../components/profileCreationSteps/stepOne';
import StepTwo from '../../components/profileCreationSteps/stepTwo';
import './style.css';
import StepThree from '../../components/profileCreationSteps/stepThree';
import StepFour from '../../components/profileCreationSteps/stepFour';

const Welcome = () => {
  const { onCreateProfile, user } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: user.email,
    phone: '',
    githubUsername: '',
    bio: '',
    role: 'Student',
    specialism: 'Not yet assigned',
    cohort: 'Not yet assigned',
    startDate: 'Not yet assigned',
    endDate: 'Not yet assigned'
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
    onCreateProfile(
      profile.firstName,
      profile.lastName,
      profile.phone,
      profile.githubUsername,
      profile.bio
    );
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
