import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './Features/userSlice';
import { startLoading, stopLoading } from './Features/loadingSlice';

import ProtectedRoute from './Components/Layout/ProtectedRoute';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import MessagesPage from './Pages/MessagesPage';
import PageNotFound from './Pages/PageNotFoundPage';
import ProfilePage from './Pages/ProfilePage';
import SettingsPage from './Pages/SettingsPage';
import SignUpPage from './Pages/SignUpPage';
import AuthorizedPageContainer from './Pages/AuthorizedPageContainer';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(startLoading());
      const userStorage = await localStorage.getItem('Token');
      const initial = userStorage ? await JSON.parse(userStorage) : null;
      if (initial != null) {
        dispatch(
          checkUser({
            ...initial
          })
        );
        return dispatch(stopLoading());
      }
      dispatch(checkUser({}));
      return dispatch(stopLoading());
    };
    fetchUser();
  }, [dispatch]);

  return (
    // <div className='App' data-theme='dark'>
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/home' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          {user && (
            <Route element={<ProtectedRoute component={<AuthorizedPageContainer />} />}>
              <Route path='/messages' element={<MessagesPage />} />
              <Route path='/messages/:receiverUsername' element={<MessagesPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Route>
          )}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
