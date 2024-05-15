// UserModal.js

import React from 'react';
import "./UserModal.css"
const UserModal = ({ user, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>User Details</h2>
        <p>ID: {user._id}</p>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
        <p>Phone: {user.phone}</p>
        <p>Speciality: {user.Speciality}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
