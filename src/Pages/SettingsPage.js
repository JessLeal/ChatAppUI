import React from 'react';
import Dropdown from '../Components/Shared/Dropdown/Dropdown';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className='settings-container'>
      <div className='settings-label'>Settings</div>
      <div className='settings'>
        <div className='settings-category'>General</div>
        <div className='setting-indiv'>
          <p className='setting-name'>Theme: </p>
          <Dropdown header={'Default'} options={['Hello']} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
