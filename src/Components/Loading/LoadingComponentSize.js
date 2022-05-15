import React from 'react';
import Spinner from './Spinner';

const LoadingComponentSize = ({ message }) => {
  return (
    <div className='loading-component-container'>
      <div className='loading-spinner'>
        <Spinner />
        <div className='loading-message'>{message}</div>
      </div>
    </div>
  );
};

export default LoadingComponentSize;
