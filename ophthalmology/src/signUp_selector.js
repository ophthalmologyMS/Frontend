import React, { useState } from 'react';
import AdminSignupPage from './Admin/Signup/Signup_admin';
import DoctorSignupPage from './Doctor/Signup/Signup_doctor';
import PatientSignupPage from './Patient/Signup/Signup_patient';

const SignupSelector = () => {
  const [selectedPage, setSelectedPage] = useState('admin');

  const handlePageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Select Sign up Page</h2>
      <form style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px' }}>
          <input
            type="radio"
            id="admin"
            value="admin"
            checked={selectedPage === 'admin'}
            onChange={handlePageChange}
            style={{ marginRight: '5px' }}
          />
          <label htmlFor="admin">Admin Signup</label>
        </div>
        <div style={{ marginRight: '20px' }}>
          <input
            type="radio"
            id="doctor"
            value="doctor"
            checked={selectedPage === 'doctor'}
            onChange={handlePageChange}
            style={{ marginRight: '5px' }}
          />
          <label htmlFor="doctor">Doctor Signup</label>
        </div>
        <div>
          <input
            type="radio"
            id="patient"
            value="patient"
            checked={selectedPage === 'patient'}
            onChange={handlePageChange}
            style={{ marginRight: '5px' }}
          />
          <label htmlFor="patient">Patient Signup</label>
        </div>
      </form>

      <div style={{ marginTop: '20px' }}>
        {selectedPage === 'admin' && <AdminSignupPage />}
        {selectedPage === 'doctor' && <DoctorSignupPage />}
        {selectedPage === 'patient' && <PatientSignupPage />}
      </div>
    </div>
  );
};

export default SignupSelector;
