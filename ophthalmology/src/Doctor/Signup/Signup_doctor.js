import React, { useState } from 'react';
import './Signup_doctor.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [fees, setFees] = useState('');
  const [Speciality, setSpeciality] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://192.168.1.4:8000/api/doctorSignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone, gender, fees, Speciality }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      console.log('Doctor signed up successfully!');
      // Handle success, such as redirecting to another page or showing a success message
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError('Failed to sign up. Please try again.');
      // Handle error, such as displaying an error message to the user
    }
  };


  return (
    <div className="signup-container">
      <h2>Doctor Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label htmlFor="M">
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
            <label htmlFor="F">
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
          <label htmlFor="fees">Fees:</label>
          <input
            type="text"
            id="fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Speciality">Speciality:</label>
          <input
            type="text"
            id="Speciality"
            value={Speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
