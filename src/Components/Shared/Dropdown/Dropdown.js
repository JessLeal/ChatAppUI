import React from 'react';

const Dropdown = ({ header, options }) => {
  return (
    <div className='dropdown-container'>
      <div className='dropdown-header-wrapper'>
        <div className='dropdown-header'>{header}</div>
      </div>
      <div className='dropdown-list-wrapper'>
        {options.map((o) => {
          return <div className='dropdown-item'>{o}</div>;
        })}
      </div>
    </div>
  );
};

export default Dropdown;
