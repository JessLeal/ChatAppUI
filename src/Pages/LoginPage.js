import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { login } from '../Features/userSlice';
import { startLoading, stopLoading } from '../Features/loadingSlice';
import axiosBase from '../API/axiosBase';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const { enqueueSnackbar } = useSnackbar();

  const onLogin = async (values) => {
    dispatch(startLoading({ type: 'submit' }));
    try {
      const res = await axiosBase.post('/accounts/login', values);

      if (res.status === 200) {
        const userResult = res.data;
        const userString = await JSON.stringify(userResult);
        dispatch(
          login({
            username: userResult.username,
            knownAs: userResult.knownAs,
            email: userResult.email,
            token: userResult.token,
            photoUrl: userResult?.photoUrl
          })
        );

        return localStorage.setItem('Token', userString);
      }

      const errorMessageFx = () => {
        if (res.data.errors) {
          const modalStateErrors = [];
          for (const key in res.data.errors) {
            if (res.data.errors[key]) {
              modalStateErrors.push(`${res.data.errors[key]}`);
            }
          }
          return modalStateErrors.map((msg) => {
            return enqueueSnackbar(`${msg}`, {
              variant: 'error'
            });
          });
        }
        return enqueueSnackbar(`${res.data}`, {
          variant: 'error'
        });
      };

      return errorMessageFx();
    } finally {
      dispatch(stopLoading({ type: 'submit' }));
    }
  };

  return (
    <div className='login-container'>
      {Object.keys(user).length === 0 ? (
        <>
          <div className='login-image-container'>
            <img
              src={process.env.PUBLIC_URL + 'images/secure_login.svg'}
              alt='password-graphic'
              className='login-image'
            />
          </div>
          <div className='login-form-container'>
            <div className='logo-svg-container'>
              <img
                className='logo-svg'
                alt='logo'
                src={
                  theme?.value === 'dark'
                    ? `${process.env.PUBLIC_URL}/Logo_Light_Text.svg`
                    : `${process.env.PUBLIC_URL}/Logo.svg`
                }
              />
            </div>
            <Form
              onSubmit={onLogin}
              render={({ handleSubmit, form, submitting, values }) => (
                <form onSubmit={handleSubmit} className='login-form'>
                  <div className='login-label'>LOGIN</div>
                  <div className='login-inputs'>
                    <Field
                      name='username'
                      render={({ input, meta }) => (
                        <>
                          <input
                            type='text'
                            {...input}
                            placeholder='Username'
                            className='login-input'
                          />
                          {meta.touched && meta.error && <span>{meta.error}</span>}
                        </>
                      )}
                    />
                    <Field
                      name='password'
                      render={({ input, meta }) => (
                        <>
                          <input
                            type='password'
                            {...input}
                            placeholder='Password'
                            className='login-input'
                          />
                          {meta.touched && meta.error && <span>{meta.error}</span>}
                        </>
                      )}
                    />
                    <button type='submit' disabled={submitting} className='login-button'>
                      Login
                    </button>
                  </div>
                  <div className='no-account'>
                    <p>Doesn't have an account?</p>
                    <Link to='/signUp'>SignUp</Link>
                  </div>
                </form>
              )}
            />
          </div>
        </>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  );
};

export default LoginPage;
