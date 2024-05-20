import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './DoctorsListModal.css';
import "bootstrap/dist/css/bootstrap.min.css";
const DoctorsListModal = ({ isOpen, onRequestClose }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/allDoctors');
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    if (isOpen) {
      fetchDoctors();
    }
  }, [isOpen]);

  const deleteDoctor = async (doctorName) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteDoctor/${doctorName}`);
      // Refresh the list of doctors after deletion
      const response = await axios.get('http://localhost:8000/api/allDoctors');
      setDoctors(response.data.data);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Doctors List"
      className="DoctorsListModal mt-5"
    >
      <h2>Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id} className="doctor-item">
            {doctor.doctorName} ({doctor.username})
            <button
              onClick={() => deleteDoctor(doctor.username)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onRequestClose} className="close-button">Close</button>
    </Modal>
  );
};

export default DoctorsListModal;
