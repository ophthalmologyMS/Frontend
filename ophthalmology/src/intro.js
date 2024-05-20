import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./Homepage/Components/eyes_legs_hands_freak_emoji_icon_149309.ico";

const Login = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (loginType) => {
    setIsLoading(true);
    let url = '';
    switch (loginType) {
      case 'patient':
        url = 'http://localhost:8000/api/patientLogin';
        break;
      case 'admin':
        url = 'http://localhost:8000/api/adminLogin';
        break;
      case 'doctor':
        url = 'http://localhost:8000/api/doctorLogin';
        break;
      default:
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      navigate(`/Home/${username}/${loginType}`);
      console.log(`${loginType.charAt(0).toUpperCase() + loginType.slice(1)} signed in successfully!`);
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!userType || !username || !password) {
      setError('Please fill in all fields');
    } else {
      handleLogin(userType);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="login-container">
        <h2 className="text-center mb-4">
          <img src = {logo} alt="Login Icon" className="login-icon" />
          Login
        </h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="row mb-3 text-center">
            <div className="login-option col">
              <label className="d-block">
                <input
                  type="radio"
                  name="userType"
                  value="patient"
                  onChange={() => setUserType('patient')}
                  className="me-2"
                />
                Patient
              </label>
            </div>
            <div className="login-option col">
              <label className="d-block">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  onChange={() => setUserType('admin')}
                  className="me-2"
                />
                Admin
              </label>
            </div>
            <div className="login-option col">
              <label className="d-block">
                <input
                  type="radio"
                  name="userType"
                  value="doctor"
                  onChange={() => setUserType('doctor')}
                  className="me-2"
                />
                Doctor
              </label>
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="login-button btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .login-container {
          width: 100%;
          max-width: 400px;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease-in-out;
        }
        .alert {
          text-align: center;
        }
        .login-icon {
          width: 30px; /* Adjust the width of the image */
          height: auto; /* Maintain aspect ratio */
          margin-right: 10px; /* Add spacing between the image and the text */
        }
        .login-option label {
          font-weight: 600;
          cursor: pointer;
        }
        .login-option input[type="radio"] {
          margin-right: 5px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .form-group input[type="text"],
        .form-group input[type="password"] {
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 5px;
          transition: border-color 0.3s;
        }
        .form-group input[type="text"]:focus,
        .form-group input[type="password"]:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
        }
        .login-button {
          padding: 10px;
          font-size: 16px;
          font-weight: 600;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          transition: background-color 0.3s, transform 0.3s;
        }
        .login-button:disabled {
          background-color: #6c757d;
        }
        .login-button:hover {
          background-color: #0056b3;
          transform: translateY(-1px);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;