import React, { useState } from 'react';
import './Signup_patient.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [insurance, setInsurance] = useState('');
  const [chronicDisease, setChronicDisease] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/patientSignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          patientName,
          email,
          password,
          gender,
          phone,
          dob,
          insurance,
          chronicDisease
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      console.log('Patient signed up successfully!');
      setSuccessMessage('Signed up successfully!'); // Set success message
      setError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError('Failed to sign up. Please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="signup-container">
      <h2>Patient Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label id='label' htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label'>Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />
            <label id='label' htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />
            <label id='label' htmlFor="female">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label id='label' htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="insurance">Insurance:</label>
          <input
            type="text"
            id="insurance"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="chronicDisease">Chronic Disease:</label>
          <input
            type="text"
            id="chronicDisease"
            value={chronicDisease}
            onChange={(e) => setChronicDisease(e.target.value)}
            required
          />
        </div>
        <button className='submit-button' type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
