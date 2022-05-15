import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, children, onModalOverlayClick }) => {
  return (
    <>
      {isOpen && (
        <div className='modal-container'>
          <div className='modal-overlay' onClick={onModalOverlayClick} />
          <div className='modal-content'>
            <>{children}</>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
