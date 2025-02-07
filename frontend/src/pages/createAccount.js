import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/createAccount.css';
import axios from 'axios';

function CreateAccountPage() {
  // react hooks for the createAccountPage
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [program, setProgram] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()
  // handles the onClick event for the create account button
  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Password does not match');
    } else {
      setErrorMessage('');
      const student = {
        studentNumber: studentId,
        name: fullName,
        email:email,
        program: program,
        schoolName: schoolName,
        password: password,
      }
      axios.post('http://localhost:5352/schoolwork-tracker/students/create-student-account/', student)
        .then(response => {
        if (response.data) {
          console.log(response.data);
          setErrorMessage('Account Created. Redirecting to Login Page...');
          
          // Redirect to login page after 3 seconds if account is created
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      })
      .catch(error => {
        console.log('Error creating account:', error);
        setErrorMessage('Account may already exist. Please try logging in.');
      });
    }
    
  };
// handles the onClick event for the back to login button by navigating to the login page
const backToLogin = () => {
  navigate('/')
}
  return (
    <div className="create-account-container">
      <div className="header">
        <h1>SCHOOLWORK TRACKER APP</h1>
      </div>
      <h2>Create Account</h2>
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
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="program">Program:</label>
          <input
            type="text"
            id="program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="schoolName">School Name:</label>
          <input
            type="text"
            id="schoolName"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="button-group">
          <button className="back-login-button" onClick={backToLogin}>Back to Login</button>
          <button className="create-account-button" onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;
