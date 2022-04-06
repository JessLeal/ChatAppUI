import React from 'react';
import { useSelector } from 'react-redux';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);

  return <div className='profile-container'>ProfilePage</div>;
};

export default ProfilePage;
