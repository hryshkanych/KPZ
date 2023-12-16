import React from 'react';
import '../Styles/Modal.css'; 

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content">
            <h2>{message}</h2>
            <button className="close-button" onClick={onClose}>
                Close
            </button>
            </div>
        </div>
        </div>
    );
};

export default Modal;
