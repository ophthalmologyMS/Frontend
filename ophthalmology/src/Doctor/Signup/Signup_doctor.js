import React, { useState } from 'react';
import './Signup_doctor.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/doctorSignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          doctorName,
          email,
          password,
          phone,
          gender,
          fees,
          speciality
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      console.log('Doctor signed up successfully!');
      setSuccessMessage('Signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError('Failed to sign up. Please try again.');
      setSuccessMessage('');
    }
  };


  return (
    <div className="signup-container">
      <h2>Doctor Sign Up</h2>
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
          <label id='label' htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
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
          <label id='label'>Gender:</label>
          <div>
            <label id='label' htmlFor="M">
              <input
                type="radio"
                id="M"
                name="gender"
                value="M"
                checked={gender === 'M'}
                onChange={() => setGender('M')}
                required
              />
              Male
            </label>
            <label id='label' htmlFor="F">
              <input
                type="radio"
                id="F"
                name="gender"
                value="F"
                checked={gender === 'F'}
                onChange={() => setGender('F')}
                required
              />
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label id='label' htmlFor="fees">Fees:</label>
          <input
            type="text"
            id="fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label id='label' htmlFor="speciality">Speciality:</label>
          <input
            type="text"
            id="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
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
