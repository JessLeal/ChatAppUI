import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { login } from '../Features/userSlice';
import axiosBase from '../API/axiosBase';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const onLogin = async (values) => {
    const res = await axiosBase.post('/accounts/login', values);
    if (res.status === 200) {
      const userResult = res.data;
      const userString = await JSON.stringify(userResult);
      dispatch(
        login({
          username: userResult.username,
          token: userResult.token
        })
      );

      return await localStorage.setItem('Token', userString);
    }

    const errorMessageFx = () => {
      if (res.data.errors) {
        const modalStateErrors = [];
        for (const key in res.data.errors) {
          if (res.data.errors[key]) {
            modalStateErrors.push(res.data.errors[key]);
          }
        }
        return modalStateErrors.map((msg) => {
          return enqueueSnackbar(msg, {
            variant: 'error'
          });
        });
      }
      return enqueueSnackbar(res.data, {
        variant: 'error'
      });
    };

    return errorMessageFx();
  };

  return (
    <div className='login-container'>
      {console.log(Object.keys(user).length)}
      {Object.keys(user).length === 0 ? (
        <>
          <div className='login-image-container conditional-hide'>
            <img
              src={process.env.PUBLIC_URL + 'images/password.svg'}
              alt='password-graphic'
              className='login-image'
            />
          </div>
          <Form
            onSubmit={onLogin}
            render={({ handleSubmit, form, submitting, values }) => (
              <div className='login-form-container'>
                <form onSubmit={handleSubmit} className='login-form'>
                  <div className='login-label'>WELCOME</div>
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
                </form>
              </div>
            )}
          />
        </>
      ) : (
        <Navigate to='/' />
      )}
      ;
    </div>
  );
};

export default LoginPage;
