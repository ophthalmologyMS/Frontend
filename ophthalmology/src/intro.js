// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handlePatientLogIn = async (event) => {    
    try {
      const response = await fetch('http://localhost:8000/api/patientLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      navigate(`/Home/${username}/patient`)
      console.log('patient signed in successfully!');
      // Handle success, such as redirecting to another page or showing a success message
    } catch (error) {
        alert("Failed to login")
      console.error('Error signing in:', error.message);
      setError('Failed to sign in. Please try again.');
      // Handle error, such as displaying an error message to the user
    }
  };

  const handleAdminLogIn = async (event) => {    
    try {
      const response = await fetch('http://localhost:8000/api/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      navigate(`/Home/${username}/admin`)
      console.log('Admin signed in successfully!');
      // Handle success, such as redirecting to another page or showing a success message
    } catch (error) {
        alert("Failed to login")
      console.error('Error signing in:', error.message);
      setError('Failed to sign in. Please try again.');
      // Handle error, such as displaying an error message to the user
    }
  };
  const handleDoctorLogIn = async (event) => {    
    try {
      const response = await fetch('http://localhost:8000/api/doctorLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      navigate(`/Home/${username}/doctor`)
      console.log('Doctor signed in successfully!');
      // Handle success, such as redirecting to another page or showing a success message
    } catch (error) {
        alert("Failed to login")
      console.error('Error signing in:', error.message);
      setError('Failed to sign in. Please try again.');
      // Handle error, such as displaying an error message to the user
    }
  };

    const handleLogin = () => {
    // Implement your login logic here based on the selected userType, username, and password
        console.log(55)
    if(!userType || !name || !password){
        alert("please enter all fields")
    }else if(userType === "patient"){
        handlePatientLogIn()
    }else if(userType === "admin"){
        handleAdminLogIn()
    }else if(userType === "doctor"){
        handleDoctorLogIn()
    }
    // Example: Redirect to the appropriate dashboard page
    // You can replace this with your actual logic
  };

  return (
    <div className='container-fluid vh-100 bg-danger'>
        <div className='row h-100 align-items-center'>
        <div className="login-container">
      <h2>Login</h2>
      <div className='row '>
      <div className="login-option col-3">
        <label>
          <input
            type="radio"
            name="userType"
            value="patient"
            onChange={() => setUserType('patient')}
          />
          Patient
        </label>
      </div>
      <div className="login-option col-3">
        <label>
          <input
            type="radio"
            name="userType"
            value="admin"
            onChange={() => setUserType('admin')}
          />{' '}
          Admin
        </label>
      </div>
      <div className="login-option col-3">
        <label>
          <input
            type="radio"
            name="userType"
            value="doctor"
            onChange={() => setUserType('doctor')}
          />{' '}
          Doctor
        </label>
      </div>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => {setUsername(e.target.value); setName(e.target.value)}}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .login-option {
          margin-bottom: 10px;
        }
        .login-option label {
          display: block;
          font-weight: bold;
        }
        .login-option input[type="radio"] {
          margin-right: 5px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: bold;
        }
        .form-group input[type="text"],
        .form-group input[type="password"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
        .login-button {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
      `}</style>
    </div>
        </div>
    </div>
  );
};

export default Login;
