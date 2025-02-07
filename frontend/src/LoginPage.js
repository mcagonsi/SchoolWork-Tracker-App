import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    
    sessionStorage.setItem('studentId', studentId);
  }, [studentId]);

  useEffect(() => {
    
    sessionStorage.setItem('userId', userId);
  }, [userId]);


// handles the login process for the user
  const handleLogin = () => {
    setErrorMessage('');  // Clear any previous errors
    setSuccessMessage('');  // Clear any previous success messages

    // Checks if the password is valid or missing
    if (!studentId || !inputPassword) {
      setErrorMessage('Student ID or password is missing!');
    } else {
      // Fetch password based on student ID from API
      axios
        .get(`http://localhost:5352/schoolwork-tracker/students/login/studentId=${studentId}`)
        .then((response) => {
          if (response.data && response.data.password) {
            if (inputPassword === response.data.password) {
              setSuccessMessage('Login Successful');

              //i am using sessionStorage to keep track of the userid and studentNumber to be able to access in other pages
              
              setUserId(response.data.userID);
              // sessionStorage.setItem('userId',response.data.userID);
              // sessionStorage.setItem('studentId',studentId);

              //if the password is valid then it navigates to the dashboard page
              navigate('/dashboard')
            } else {
              setErrorMessage('Invalid password. Please try again.');
            }
          } else {
            setErrorMessage('Student ID not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching password:', error);
          setErrorMessage('Failed to fetch password. Please try again later.');
        });
    }
  };

  // handles the onclick event for the create account button. it navigates to the create account page
  const createAccount = () => {
    navigate('/create-account')
  }

  return (
    <div className="login-container">
      <div className="header">
        <h1>SCHOOLWORK TRACKER APP</h1> <br></br>
        
      </div>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="studentId">Student Id:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="button-group">
          <button className="create-account-button" onClick={createAccount}>Create Account</button>
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
      <p>by Michael Agonsi</p>
    </div>
  );
}

// exports the loginPage for render, corresponding with the root entry point on the routes
export default LoginPage;

