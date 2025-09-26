import { useState, useEffect } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import { getProfile } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const { user, token } = useAuth();
  const [initials, setInitials] = useState('');

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.id);
        setInitials(`${profileData?.firstName} ${profileData?.lastName}`.match(/\b(\w)/g));
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [user, token]);

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>{initials}</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
          </form>
        </Card>

        <Card>
          <h4>My Cohort</h4>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
