import Form from '../../form';

const StepFour = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <textarea
            name="bio"
            value={data.bio}
            onChange={setData}
            placeholder={
              'Tell us about yourself, your proffessional and educational highlights to date...'
            }
          ></textarea>
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepFour;
