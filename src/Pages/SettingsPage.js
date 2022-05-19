import React from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../Features/themeSlice';
import { themeOptions } from '../Constants/options';

import './SettingsPage.css';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleChangeTheme = (value) => {
    dispatch(setTheme(value));
    return localStorage.setItem('Theme', JSON.stringify(value));
  };

  return (
    <div className='settings-container'>
      <div className='settings-label'>Settings</div>
      <div className='settings'>
        <div className='settings-category'>General</div>
        <div className='setting-indiv'>
          <p className='setting-name'>Theme: </p>
          <Select
            className='dropdown'
            options={themeOptions}
            name='theme'
            defaultValue={theme}
            onChange={(value) => handleChangeTheme(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
