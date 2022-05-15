import React from 'react';
import { useSelector } from 'react-redux';

import LoadingFull from './LoadingFull';
import LoadingComponentSize from './LoadingComponentSize';

import './Loading.css';

const Loading = () => {
  const { isLoading } = useSelector((state) => state.isLoading);

  const renderLoading = () => {
    if (isLoading.submit) {
      return <LoadingFull />;
    }

    if (isLoading.messages) {
      console.log('Hello');
      return <LoadingComponentSize />;
    }

    // return <LoadingComponentSize />;
  };

  return <>{renderLoading()}</>;
};

export default Loading;
