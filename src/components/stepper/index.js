import Steps from './steps';
import Card from '../card';
import Button from '../button';
import './style.css';
import { useState } from 'react';

const Stepper = ({ header, children, onComplete, stepCondition = true }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextClick = () => {
    if (currentStep === children.length - 1) {
      onComplete();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  return (
    <Card>
      {header}
      <div className="steps-container">
        <Steps maxSteps={children.length} currentStep={currentStep} />
      </div>

      {children[currentStep]}

      <div className="stepper-buttons">
        <Button text="Back" classes="offwhite" onClick={onBackClick} />
        <Button
          text={currentStep === children.length - 1 ? 'Submit' : 'Next'}
          disabled={!stepCondition}
          classes="blue"
          onClick={onNextClick}
        />
      </div>
    </Card>
  );
};

export default Stepper;
