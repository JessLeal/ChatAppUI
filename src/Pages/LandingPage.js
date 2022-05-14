import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {Object.keys(user).length === 0 ? <Navigate to='/login' /> : <Navigate to='/messages' />}
    </div>
  );
};

export default LandingPage;
