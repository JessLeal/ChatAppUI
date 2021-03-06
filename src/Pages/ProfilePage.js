import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import Modal from '../Components/Shared/Modal';
import PhotoUpload from '../Components/Profile/PhotoUpload';
import axiosBase from '../API/axiosBase';
import { setUser } from '../Features/userSlice';
import { startLoading, stopLoading } from '../Features/loadingSlice';

import './ProfilePage.css';

const ProfilePage = () => {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState('');
  const [fileSelected, setFileSelected] = useState(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);
  const initialFormValues = { knownAs: user.knownAs };

  const photoUploadHandler = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setFileSelected(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setPrevImgUrl(url);
    }
  };

  const photoSubmitHandler = async () => {
    dispatch(startLoading({ type: 'submit' }));
    try {
      const payload = new FormData();

      if (fileSelected) {
        payload.append('file', fileSelected);
        const res = await axiosBase.post('/users/add-photo', payload);

        setOpenPhotoModal(false);
        setFileSelected(null);
        if (res.status === 201) {
          return dispatch(setUser({ photoUrl: res.data.url }));
        } else {
          return enqueueSnackbar(
            `An error occured while uploading your photo, please try again later`,
            {
              variant: 'error'
            }
          );
        }
      }

      return enqueueSnackbar(`Please upload a photo`, {
        variant: 'error'
      });
    } finally {
      dispatch(stopLoading({ type: 'submit' }));
    }
  };

  const submitHandler = async (values) => {
    dispatch(startLoading({ type: 'submit' }));
    try {
      const res = await axiosBase.put('/users', values);

      if (res.status === 204) {
        return dispatch(setUser({ ...values }));
      }

      return enqueueSnackbar(
        `An error occured when updating your profile. Please try again later.`,
        {
          variant: 'error'
        }
      );
    } finally {
      dispatch(stopLoading({ type: 'submit' }));
    }
  };

  return (
    <div className='profile-container'>
      <div className='profile-label'>Profile Page</div>
      <div className='profile'>
        <div className='profile-photo-container'>
          <img
            src={user.photoUrl || `${process.env.PUBLIC_URL}/images/user.png`}
            alt='profile'
            className='profile-photo'
          />
          <div className='photo-edit' onClick={() => setOpenPhotoModal(true)}>
            <AddAPhotoOutlinedIcon />
          </div>
        </div>

        <Modal isOpen={openPhotoModal} onModalOverlayClick={() => setOpenPhotoModal(false)}>
          <div className='photo-modal'>
            {prevImgUrl && <img src={prevImgUrl} alt='preview' className='preview-image' />}
            <PhotoUpload photoUploadHandler={photoUploadHandler} />
            <div className='photo-upload-buttons'>
              <button className='photo-button save-photo-button' onClick={photoSubmitHandler}>
                Save
              </button>
              <button
                className='photo-button cancel-photo-button'
                onClick={() => setOpenPhotoModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        <Form
          initialValues={initialFormValues}
          onSubmit={submitHandler}
          render={({ handleSubmit, form, submitting, values }) => (
            <div className='profile-form-container'>
              <form onSubmit={handleSubmit} className='profile-form'>
                <Field
                  name='username'
                  render={() => (
                    <>
                      <label htmlFor='Username' className='input-label'>
                        Username:
                      </label>
                      <input
                        name='Username'
                        type='text'
                        className='profile-input'
                        value={user.username}
                        disabled
                      />
                    </>
                  )}
                />
                <Field
                  name='email'
                  render={() => (
                    <>
                      <label htmlFor='Email' className='input-label'>
                        Email:
                      </label>
                      <input
                        type='text'
                        name='Email'
                        value={user.email}
                        className='profile-input'
                        disabled
                      />
                    </>
                  )}
                />
                <Field
                  name='knownAs'
                  render={({ input, meta }) => (
                    <>
                      <label htmlFor='Nickname' className='input-label'>
                        Nickname:
                      </label>
                      <input type='text' {...input} name='Nickname' className='profile-input' />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </>
                  )}
                />
                <button type='submit' className='submit-botton'>
                  Save Changes
                </button>
              </form>
            </div>
          )}></Form>
      </div>
    </div>
  );
};

export default ProfilePage;
