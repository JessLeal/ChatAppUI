import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { signUp } from '../Features/userSlice';
import axiosBase from '../API/axiosBase';
import './SignUpPage.css';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const onSignUp = async (values) => {
    const res = await axiosBase.post('/accounts/register', values);

    if (res?.status === 200) {
      const userResult = res.data;
      const userString = await JSON.stringify(userResult);
      dispatch(
        signUp({
          username: userResult.username,
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
          <div className='signUp-image-container conditional-hide'>
            <img
              src={process.env.PUBLIC_URL + 'images/things_to_say.svg'}
              alt='things_to_say-graphic'
              className='signUp-image'
            />
          </div>
          <Form
            onSubmit={onSignUp}
            render={({ handleSubmit, form, submitting, values }) => (
              <div className='signUp-form-container'>
                <form onSubmit={handleSubmit} className='signUp-form'>
                  <div className='signUp-label'>Sign Up</div>
                  <div className='signUp-inputs'>
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

export default SignUpPage;
