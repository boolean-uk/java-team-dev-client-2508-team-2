import { useState } from 'react';
import Form from '../../form';
import TextInput from '../../form/textInput';

const StepTwo = ({ data, setData, locked = true }) => {
  const [passwordError, setPasswordError] = useState('');

  function onPasswordChange(e) {
    setData(e);
    if (
      e.target.name === 'password' &&
      (e.target.value.length < 8 ||
        !hasUpperCase(e.target.value) ||
        !hasSpecialChar(e.target.value) ||
        !hasNumber(e.target.value))
    ) {
      setPasswordError(
        'The password needs to be at least eight characters, including at least one capital letter, one number and one special character (!@#$%^&*())'
      );
    } else if (e.target.name === 'password') {
      setPasswordError('');
    }
  }

  function hasUpperCase(str) {
    return str !== str.toLowerCase();
  }

  function hasSpecialChar(str) {
    const regex = /[!@#$%^&*()]/;
    if (regex.test(str)) {
      return true;
    }
  }

  function hasNumber(str) {
    const regex = /[0-9]/;
    if (regex.test(str)) {
      return true;
    }
  }

  return (
    <>
      <div className="welcome-formheader">
        <h3>Contact info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={data.email}
            name="email"
            label={'Email*'}
            type={locked ? 'locked' : 'text'}
          />
          <TextInput onChange={setData} value={data.phone} name="phone" label={'Phone'} />
          {!locked && (
            <TextInput
              type="password"
              onChange={onPasswordChange}
              value={data.password}
              name="password"
              label={'Password*'}
              errorMessage={passwordError}
            />
          )}
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
