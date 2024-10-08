// Modal.js
import React from 'react';

const Modal = ({closeModal }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>Welcome !</p>
      </div>
    </div>
  );
}

export default Modal;
