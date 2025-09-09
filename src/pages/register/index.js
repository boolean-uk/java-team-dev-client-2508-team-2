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
    if (
      name === 'password' &&
      (value.length < 8 || !hasUpperCase(value) || !hasSpecialChar(value) || !hasNumber(value))
    ) {
      setPasswordError(
        'The password needs to be at leats eight characters, including at least one capital letter, one number and one special character (!@#$%^&*())'
      );
    } else if (name === 'password') {
      setPasswordError('');
    }
  };

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

  function onSubmit(e) {
    e.preventDefault();

    if (!passwordError) {
      onRegister(formData.email.toLowerCase(), formData.password).catch((err) => {
        console.error(err.message);
        setEmailError(err.message);

        if (formData.password === '') {
          setPasswordError("Password can't be empty");
          setTimeout(() => setPasswordError(''), 2000);
        }

        setTimeout(() => setEmailError(''), 2000);
      });
    }
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
              errorMessage={emailError}
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
              errorMessage={passwordError}
            />
          </form>
          <Button text="Sign up" onClick={onSubmit} classes="green width-full" />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
