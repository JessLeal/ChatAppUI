import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <div>
          <h1>LandingPage</h1>
          <img src='/images/talking_people.jpg' alt='image' className='home-image' />
        </div>
      ) : (
        <Navigate to='/messages' />
      )}
    </div>
  );
};

export default LandingPage;
