/* TaskTabs Component */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskTabs({ activeTab, setActiveTab, tasks }) {
  const navigate = useNavigate()

  // useState hooks for the TaskTabs
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  //for displaying error and success messages when creating tasks
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState('');
  
 useEffect(()=>{
  const storedUserId = sessionStorage.getItem('userId');
  setUserId(storedUserId);
 })
  
// handles the onClick event for the create task tab and switches the tab currently being displayed
  const handleCreateTask = () => {
    // const userId = sessionStorage.getItem('userId');

    if (course && description && dueDate) {
      const newTask = {
        studentNumber: userId,
        course:course,
        description: description,
        dueDate: dueDate,
        status: 'Pending',
      };
      axios.post('http://localhost:5352/schoolwork-tracker/tasks/student/tasks/create-task', newTask)
        .then(response => {
        if (response.data) {
          console.log(response.data);
          setSuccessMessage('Task Created');
          setErrorMessage('')
          
          setTimeout(() => {
            setActiveTab('upcoming'); navigate(0);
          }, 1500);
        }
      })
      .catch(error => {
        console.log('Error creating Task:', error);
        setErrorMessage('Something went wrong');
      });
   
      console.log('New Task Created:', newTask);
    } else{
      setErrorMessage("All fields are required")
    }
  };

  // handles the onClick event for the mark as completed button and sets the status of the task to completed
  // updates the task based on the respective task._id
  const markCompleted = (task_id) => {
    if (task_id) {
      const newTask = {
        status: 'Completed',
      };
      axios.put(`http://localhost:5352/schoolwork-tracker/tasks/student/tasks/id=${task_id}`, newTask)
        .then(response => {
        if (response.data) {
          console.log(response.data);
          
          setTimeout(() => {
            setActiveTab('upcoming'); navigate(0); //switches tab to upcoming tasks and reloads the page after 1.5secs
          }, 1500);
        }
      })
      .catch(error => {
        console.log('Error Updating Task:', error);
        
      });
      
    } else{
      console.log('Invalid task id.')
    }
    
  }

  // handles the onClick event for the delete completed task button and deletes the task based on the respective task._id
  const markDeleted = (task_id) => {
    if (task_id) {
      
      axios.delete(`http://localhost:5352/schoolwork-tracker/tasks/student/tasks/id=${task_id}`,)
        .then(response => {
        if (response.data) {
          console.log(response.data);
          
          setTimeout(() => {
            setActiveTab('upcoming'); navigate(0); //reloads the page
          }, 1500);
        }
      })
      .catch(error => {
        console.log('Error Updating Task:', error);
        
      });
      
    } else{
      console.log('Invalid task id.')
    }
  }

  // generates the list for pending and completed tasks by filtering through all the tasks list based on the status
  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

   // gets the upcoming tasks that are with 7 days due
  const upcomingTasks = tasks.filter(task => Math.floor((new Date(task.dueDate).getTime() - new Date().getTime())/ (1000 * 3600 * 24)) <= 7 && task.status === 'Pending' &&
  Math.floor((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) >= 0);


// renders the contents
  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return (
          <div className="task-list">
            {upcomingTasks.map((task) => (
              <div key={task._id} className="task-item">
                <p><strong>Course:</strong> {task.course}<br></br> <strong>Days Left:</strong> {Math.floor((new Date(task.dueDate).getTime() - new Date().getTime())/ (1000 * 3600 * 24))}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <hr />
              </div>
            ))}
          </div>
        );
      case 'create':
        return (
          <div className="task-create">
            <div className="input-group">
              <label htmlFor="course">Course:</label>
              <input
                type="text"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <button className="create-task-button" onClick={handleCreateTask}>
              Create Task
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        );
      case 'pending':
        return (
          <div className="task-pending">
            {pendingTasks.map((task) => (
              <div key={task._id} className="task-item">
                <p><strong>Course:</strong> {task.course} <br></br><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString('en-US', {year: 'numeric',month: 'long',day: 'numeric'})}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <button className="mark-completed-button" onClick={()=>{markCompleted(task._id)}}>Mark as completed</button>
                <hr />
              </div>
            ))}
          </div>
        );
      case 'completed':
        return (
          <div className="task-completed">
            {completedTasks.map((task) => (
              <div key={task._id} className="task-item">
                <p><strong>Course:</strong> {task.course} <br></br><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString('en-US', {year: 'numeric',month: 'long',day: 'numeric'})}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <button className="delete-completed-button" onClick={()=>{markDeleted(task._id)}}>Delete Completed Task</button>
                <hr />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button className="tab-button" onClick={() => setActiveTab('upcoming')}>Upcoming Due Dates</button>
        <button className="tab-button" onClick={() => setActiveTab('create')}>Create Task</button>
        <button className="tab-button" onClick={() => setActiveTab('pending')}>Pending Tasks</button>
        <button className="tab-button" onClick={() => setActiveTab('completed')}>Completed Task</button>
      </div>
      {renderContent()}
    </div>
  );
}

export default TaskTabs;