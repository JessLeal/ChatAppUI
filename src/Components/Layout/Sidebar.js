import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Features/userSlice';

//Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';

import './Sidebar.css';

const Sidebar = () => {
  const [menuActive, setMenuActive] = useState(false);
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
      <div className='logo-content'>
        <div className='logo' onClick={() => navigate('/')}>
          <WifiTetheringOutlinedIcon />
          <div className='logo-name'>ChatApp</div>
        </div>
        <div className='menu-container' onClick={() => setMenuActive(!menuActive)}>
          {menuActive ? (
            <CloseOutlinedIcon className='menu-button svg-icon' />
          ) : (
            <MenuOutlinedIcon className='menu-button svg-icon' />
          )}
        </div>
      </div>
      <ul className={`nav-list ${!menuActive && 'conditional-hide'}`}>
        <li>
          <NavLink to='/messages'>
            <ForumOutlinedIcon className='svg-icon' />
            <span className='link-name'>Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile'>
            <AccountCircleOutlinedIcon className='svg-icon' />
            <span className='link-name'>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings'>
            <SettingsOutlinedIcon className='svg-icon' />
            <span className='link-name'>Settings</span>
          </NavLink>
        </li>
      </ul>
      <div className={`profile-content ${!menuActive && 'conditional-hide'}`}>
        <div className='profile'>
          <div className='profile-details'>
            {/* <img src='profile.jpg'/> */}
            <div className='name'>{user?.knownAs}</div>
          </div>
          <LogoutOutlinedIcon id='logout' className='svg-icon' onClick={onLogout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
