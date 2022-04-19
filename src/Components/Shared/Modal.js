import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div className='modal-container'>
          <div className='modal-content'>
            <>{children}</>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
