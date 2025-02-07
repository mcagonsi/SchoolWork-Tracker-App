import React, { useState, useEffect } from 'react';
import '../css/taskDashboard.css';
import AccountInfo from '../components/accountInfo';
import TaskTabs from '../components/taskTabs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskDashboard() {
  // taskboard useState hooks
  const [activeTab, setActiveTab] = useState('upcoming');
  const [tasks, setTasks] = useState([]);
  const [studentData, setStudentData] = useState({});
  const [studentId, setStudentId] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate()
  
  // const studentId = sessionStorage.getItem('studentId');
 
  useEffect(() => {
    const storedStudentId = sessionStorage.getItem('studentId');
    const storedUserId = sessionStorage.getItem('userId');
    
    setStudentId(storedStudentId);
    setUserId(storedUserId);
  }, [navigate]);

  

  // gets the number of task for pending and completed tasks
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;

  
 
  // handles the onClick event for the dashboard nav link by reloading the page
  const openDashboard = () => {
    navigate(0)
  };

// handles the onClick event for the profile nav link by navigating to the profile page
  const openProfile = () => {
    navigate('/profile')
  };

  // handles the onClick event for the logout nav link by clearing session storage and navigating to the login page
  const logOut = () => {
    sessionStorage.clear();
    navigate('/')
  }

 // gets and sets student data object from database
  useEffect(() => {
    axios
        .get(`http://localhost:5352/schoolwork-tracker/students/student-details/studentId=${studentId}`)
        .then((response) => {
          if (response.data) {
    
            setStudentData(response.data[0]);
          } else {
            console.log('No Student found');
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
  },[studentId])

 // gets all the tasks associate with student or user an sets the arraylist for filtering into other components
  useEffect(() => {
    if (userId) {
      
      axios
        .get(`http://localhost:5352/schoolwork-tracker/tasks/student/tasks/studentId=${userId}`)
        
        .then((response) => {
          if (response.data) {
            setTasks(response.data);
            
          } else {
            console.log('No tasks found');
            
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }},[userId])

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Task Dashboard</h1>
        <div className="nav-links">
          <button onClick={openDashboard}>Dashboard</button>
          <button onClick={openProfile}>Profile</button>
          <button onClick={logOut}>Logout</button>
        </div>
      </div>
      <AccountInfo studentData={studentData} pending = {pendingTasks} totalTasks = {tasks.length} completedTasks = {completedTasks} />
      <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} tasks={tasks} />
    </div>
  );
}

export default TaskDashboard;

