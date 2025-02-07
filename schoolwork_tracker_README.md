# Schoolwork Tracker App

## Overview

Schoolwork Tracker App is a web-based application designed to help students effectively manage and track their academic tasks, such as assignments and tests. The app allows users to create accounts, add tasks, and monitor their progress. It aims to improve productivity and skillful time management for students.

## Features

- **Student Account Management**: Create and manage student profiles, including personal details and academic program information.
- **Task Management**: Create, view, update, and delete tasks associated with each student, helping to track assignments and deadlines.
- **User Authentication**: Login functionality to verify student credentials and secure user data.
- **API for CRUD Operations**: REST APIs to create, read, update, and delete data for students and tasks.

## Tech Stack

- **Frontend**: 
  - React.js for the user interface
  - Material-UI (MUI) for styled components
  - React Router for navigation
  - Axios for API requests
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose as the ODM)
- **Server**: Nodemon for development
- **Dependencies**:
  - Express.js for handling server requests
  - MongoDB and Mongoose for database operations
  - CORS for cross-origin requests
  - JSON Web Token (JWT) for authentication

## Project Setup

### Prerequisites

- Node.js (v14 or higher) and npm should be installed
- MongoDB instance should be accessible. The app connects to a MongoDB Atlas cluster

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5352
   ```

4. Start the server in development mode using Nodemon:
   ```bash
   npm run dev
   ```
   Or to serve the production version:
   ```bash
   npm run serve
   ```

5. The server will run on port `5352` by default. You can access the API at `http://localhost:5352/`

## API Endpoints

### Student Routes

- `POST /schoolwork-tracker/students/create-student-account` - Create a new student account.
- `GET /schoolwork-tracker/students/login/studentId=:studentId` - Validate a student's login credentials.
- `GET /schoolwork-tracker/students/student-details/studentId=:studentId` - View student profile details.
- `DELETE /schoolwork-tracker/students/delete-account/studentId=:studentId` - Delete a student profile.

### Task Routes

- `GET /schoolwork-tracker/tasks/student/tasks/studentId=:studentId` - Get all tasks for a student.
- `POST /schoolwork-tracker/tasks/student/tasks/create-task` - Create a new task for a student.
- `PUT /schoolwork-tracker/tasks/student/tasks/id=:id` - Update task status.
- `DELETE /schoolwork-tracker/tasks/student/tasks/id=:id` - Delete a specific task.

## Project Structure

```
schoolwork-tracker/
├── client/                     # Frontend React application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   ├── utils/            # Utility functions
│   │   ├── App.js            # Main React component
│   │   └── index.js          # React entry point
│   └── package.json           # Frontend dependencies
├── server/                     # Backend Node.js/Express application
│   ├── controllers/           # Business logic
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── config/              # Configuration files
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
└── README.md
```

## License
This project is licensed under the ISC License.

## Author
Michael Agonsi

---

Feel free to contribute by submitting issues or pull requests to improve the functionality or add new features.

## Download
You can download this README file by clicking [here](./README.md).
