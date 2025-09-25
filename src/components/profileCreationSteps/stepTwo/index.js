import Form from '../../form';
import TextInput from '../../form/textInput';

const StepTwo = ({ data, setData }) => {
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
            type="locked"
          />
          <TextInput onChange={setData} value={data.phone} name="phone" label={'Phone'} />
          <TextInput
            type="password"
            onChange={setData}
            value={data.password}
            name="password"
            label={'Password*'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
