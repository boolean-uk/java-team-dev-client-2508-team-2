import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password' && value.length < 8) {
      setPasswordError(
        'The password needs to be at leats eight characters, including at least one capital letter, one number and one special character'
      );
    } else if (name === 'password') {
      setPasswordError('');
    }
  };

  function onSubmit() {
    onRegister(formData.email, formData.password).catch((e) => {
      console.error('Email already exists');
      setEmailError('Email already exists');
    });
  }

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="email"
              name="email"
              label={'Email *'}
            />
            {emailError && <p readOnly={true}>{emailError}</p>}
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
            {passwordError && <p readOnly={true}>{passwordError}</p>}
          </form>
          <Button text="Sign up" onClick={onSubmit} classes="green width-full" />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
