import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LandingPage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>{Object.keys(user).length === 0 ? <h1>LandingPage</h1> : <Navigate to='/messages' />}</div>
  );
};

export default LandingPage;
