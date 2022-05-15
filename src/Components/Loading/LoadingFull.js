import React from 'react';
import Spinner from './Spinner';

const LoadingFull = ({ message }) => {
  return (
    <div className='loading-overlay-container'>
      <div className='loading-spinner'>
        <Spinner />
        <div className='loading-message'>{message}</div>
      </div>
    </div>
  );
};

export default LoadingFull;
