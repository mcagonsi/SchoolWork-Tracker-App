import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import TaskDashboard from './pages/taskDashboard';
import StudentProfilePage from './pages/profile';
import CreateAccountPage from './pages/createAccount';

// This sets up the routes for the pages and using the useNavigate hook we can navigate from one page to another
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
        <Route path="/profile" element={<StudentProfilePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;