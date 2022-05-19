import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './Features/userSlice';
import { setTheme } from './Features/themeSlice';
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
import Loading from './Components/Loading/Loading';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.isLoading);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const initialize = async () => {
      dispatch(startLoading({ type: 'main' }));
      //Theme
      const themeStorage = localStorage.getItem('Theme');
      console.log(themeStorage);
      const initialTheme = themeStorage
        ? await JSON.parse(themeStorage)
        : { value: 'light', label: 'Light' };
      dispatch(setTheme(initialTheme));

      //User
      const userStorage = localStorage.getItem('Token');
      const initialUser = userStorage ? await JSON.parse(userStorage) : null;
      if (initialUser != null) {
        dispatch(
          checkUser({
            ...initialUser
          })
        );
        return dispatch(stopLoading({ type: 'main' }));
      }
      dispatch(checkUser({}));
      return dispatch(stopLoading({ type: 'main' }));
    };

    initialize();
  }, [dispatch]);

  return (
    <div className='App' data-theme={theme.value}>
      {!isLoading.main && (
        <>
          {!isLoading.messages && <Loading />}
          <Router>
            <Routes>
              <Route exact path='/' element={<LandingPage />} />
              <Route path='/home' element={<LandingPage />} />
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
        </>
      )}
    </div>
  );
}

export default App;
