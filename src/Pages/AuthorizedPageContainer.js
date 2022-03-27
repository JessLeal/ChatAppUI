import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Layout/Sidebar';

const AuthorizedPageContainer = () => {
  return (
    <div className='layout-container'>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AuthorizedPageContainer;
