import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.isLoading);

  return <>{user != null ? <>{Component}</> : <Navigate to='/login' />}</>;
};

export default ProtectedRoute;
