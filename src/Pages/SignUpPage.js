import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { signUp } from '../Features/userSlice';
import axiosBase from '../API/axiosBase';
import './SignUpPage.css';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const { enqueueSnackbar } = useSnackbar();

  const onSignUp = async (values) => {
    const res = await axiosBase.post('/accounts/register', values);

    if (res?.status === 200) {
      const userResult = res.data;
      const userString = await JSON.stringify(userResult);
      dispatch(
        signUp({
          username: userResult.username,
          email: userResult.email,
          knownAs: userResult.knownAs,
          token: userResult.token
        })
      );

      return await localStorage.setItem('Token', userString);
    }
    const errorMessageFx = () => {
      if (res?.data.errors) {
        const modalStateErrors = [];
        for (const key in res.data.errors) {
          if (res?.data.errors[key]) {
            modalStateErrors.push(res.data.errors[key]);
          }
        }
        return modalStateErrors.map((msg) => {
          return enqueueSnackbar(msg, {
            variant: 'error'
          });
        });
      }
      return enqueueSnackbar(res?.data, {
        variant: 'error'
      });
    };
    return errorMessageFx();
  };

  return (
    <div className='signUp-container'>
      {Object.keys(user).length === 0 ? (
        <>
          <div className='signUp-image-container'>
            <img
              src={process.env.PUBLIC_URL + 'images/add_info.svg'}
              alt='things_to_say-graphic'
              className='signUp-image'
            />
          </div>
          <div className='signUp-form-container'>
            <div className='logo-svg-container'>
              <img
                className='logo-svg'
                alt='logo'
                src={
                  theme?.value === 'dark'
                    ? `${process.env.PUBLIC_URL}/Frame 3.svg`
                    : `${process.env.PUBLIC_URL}/Frame 1.svg`
                }
              />
            </div>
            <Form
              onSubmit={onSignUp}
              render={({ handleSubmit, form, submitting, values }) => (
                <form onSubmit={handleSubmit} className='signUp-form'>
                  <div className='signUp-label'>SIGN UP</div>
                  <div className='signUp-inputs'>
                    <Field
                      name='username'
                      render={({ input, meta }) => (
                        <>
                          <input
                            type='text'
                            {...input}
                            placeholder='Username'
                            className='signUp-input'
                          />
                          {meta.touched && meta.error && <span>{meta.error}</span>}
                        </>
                      )}
                    />
                    <Field
                      name='email'
                      render={({ input, meta }) => (
                        <>
                          <input
                            type='email'
                            {...input}
                            placeholder='Email'
                            className='signUp-input'
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
                            className='signUp-input'
                          />
                          {meta.touched && meta.error && <span>{meta.error}</span>}
                        </>
                      )}
                    />
                    <button type='submit' disabled={submitting} className='signUp-button'>
                      Submit
                    </button>
                  </div>
                  <div className='with-account'>
                    <p>Already have an account?</p>
                    <Link to='/login'>Login</Link>
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

export default SignUpPage;
