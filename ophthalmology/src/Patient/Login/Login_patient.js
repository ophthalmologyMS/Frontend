import React, { useState } from 'react';
import './Login_patient.css';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://192.168.1.4:8000/api/patientLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      console.log('patient signed in successfully!');
      // Handle success, such as redirecting to another page or showing a success message
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Failed to sign in. Please try again.');
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Login</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
