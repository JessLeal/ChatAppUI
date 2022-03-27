import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Features/userSlice';

//Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';

import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const onLogout = async () => {
    await localStorage.clear();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='sidebar'>
      <div className='logo-content' onClick={() => navigate('/')}>
        <div className='logo'>
          <WifiTetheringOutlinedIcon />
          <div className='logo-name'>ChatApp</div>
        </div>
        {/* <MenuIcon className='bx bx-menu' id='menu-button' /> */}
      </div>
      <ul className='nav-list'>
        <li>
          <Link to='/messages'>
            <ForumOutlinedIcon className='svg-icon' />
            <span className='link-name'>Messages</span>
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <AccountCircleOutlinedIcon className='svg-icon' />
            <span className='link-name'>Profile</span>
          </Link>
        </li>
        <li>
          <Link to='/settings'>
            <SettingsOutlinedIcon className='svg-icon' />
            <span className='link-name'>Settings</span>
          </Link>
        </li>
      </ul>
      <div className='profile-content'>
        <div className='profile'>
          <div className='profile-details'>
            {/* <img src='profile.jpg'/> */}
            <div className='name'>{user?.username}</div>
          </div>
          <LogoutOutlinedIcon id='logout' className='svg-icon' onClick={onLogout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
