import React from 'react';

const PhotoUpload = ({ photoUploadHandler }) => {
  return (
    <div className='file-upload'>
      <input
        type='file'
        name='photoUpload'
        id='photoUpload'
        accept='image/*'
        onChange={photoUploadHandler}
        className='photo-upload'
      />
      <label htmlFor='photoUpload'>
        <div className='photo-upload-label'>Upload a photo</div>
      </label>
    </div>
  );
};

export default PhotoUpload;
