import React, { useState, useEffect } from 'react';
import '../css/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentProfilePage() {
  const [student, setStudent] = useState({name:'',schoolName:'',studentNumber:'',program:'',email: ''});
  const navigate = useNavigate();

  const studentId = sessionStorage.getItem('studentId');

  // handles the onClick event for the back to dashboard button by navigating to the dashboard
  const backToDashboard = () => {
    navigate('/dashboard');
  }

  // this use state gets all the users information based on the studentId and stores as an object
  useEffect(()=>{
    axios
        .get(`http://10.0.0.56:5352/schoolwork-tracker/students/student-details/studentId=${studentId}`)
        .then((response) => {
          if (response.data) {
            setStudent(response.data[0]);
          } else {
            console.log('No Student found');
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
  },[student])

  // handles the onClick event for the delete account and deletes student account from database along with all records
  const handleDeleteAccount = () => {
    
    axios
        .delete(`http://10.0.0.56:5352/schoolwork-tracker/students/delete-account/studentId=${studentId}`)
        .then((response) => {
          if (response.data) {
            
          } else {
            console.log('No Student found');
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    console.log('Account deleted');
    navigate('/')
  };

  return (
    <div className="profile-container">
      <div className="header">
        <h1>SCHOOLWORK TRACKER APP</h1>
      </div>
      <h2>Student Profile Details</h2>
      <div className="form-container">
        <div className="input-group">
          <label>Student Id:</label>
          <input type="text" value={student.studentNumber} readOnly />
        </div>
        <div className="input-group">
          <label>Full Name:</label>
          <input type="text" value={student.name} readOnly />
        </div>
        <div className="input-group">
          <label>Program:</label>
          <input type="text" value={student.program} readOnly />
        </div>
        <div className="input-group">
          <label>School Name:</label>
          <input type="text" value={student.schoolName} readOnly />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="text" value={student.email} readOnly />
        </div>
        <div className="button-group">
          <button className="back-login-button" onClick={backToDashboard}>Back to Dashboard</button>
          <button className="delete-account-button" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;
