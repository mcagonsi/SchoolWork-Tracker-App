/* AccountInfo Component */
import React from 'react';

function AccountInfo({ studentData ,pending, totalTasks, completedTasks}) {
 // displays account info and reports on the dashboard page
  return (
    <div className="account-info">
      <div className="account-details">
        <h2>Account Information</h2>
        <p><strong>Name:</strong> {studentData.name}</p>
        <p><strong>Student Id:</strong> {studentData.studentNumber}</p>
        <p><strong>Program:</strong> {studentData.program}</p>
      </div>
      <div className="task-stats">
        <p><strong>Total Tasks:</strong> {totalTasks}</p>
        <p><strong>Pending:</strong> <span className="pending-tasks">{pending}</span></p>
        <p><strong>Completed:</strong> <span className='completed-tasks'>{completedTasks}</span></p>
        
      </div>
    </div>
  );
}

export default AccountInfo;