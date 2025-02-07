
# Schoolwork Tracker App

## Overview

Schoolwork Tracker App is a web-based application designed to help students effectively manage and track their academic tasks, such as assignments and tests. The app allows users to create accounts, add tasks, and monitor their progress. It aims to improve productivity and skillful time management for students.

## Features

- **Student Account Management**: Create and manage student profiles, including personal details and academic program information.
- **Task Management**: Create, view, update, and delete tasks associated with each student, helping to track assignments and deadlines.
- **User Authentication**: Login functionality to verify student credentials and secure user data.
- **API for CRUD Operations**: REST APIs to create, read, update, and delete data for students and tasks.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose as the ODM)
- **Server**: Nodemon for development
- **Dependencies**:
  - Express.js for handling server requests
  - MongoDB and Mongoose for database operations
  - CORS for cross-origin requests

## Project Setup

### Prerequisites

- Node.js and npm should be installed.
- MongoDB instance should be accessible. The app connects to a MongoDB Atlas cluster.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd schoolwork-tracker-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server in development mode using Nodemon:
   ```bash
   npm run dev
   ```
   Or to serve the production version:
   ```bash
   npm run serve
   ```

2. The server will run on port `5352` by default. You can access the API at `http://localhost:5352/`.

### Environment Variables

Make sure to update the MongoDB connection string in `index.js` to use your MongoDB instance:
```javascript
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.yopg5.mongodb.net/', { dbName: 'schoolworktracker' })
```
Replace `<username>` and `<password>` with appropriate credentials.

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

- **controllers/**: Contains business logic for students and tasks.
  - `student.controller.js` - Student CRUD operations.
  - `task.controller.js` - Task CRUD operations.
- **models/**: Mongoose schemas for database operations.
  - `student.model.js` - Defines the structure of the student documents.
  - `task.model.js` - Defines the structure of the task documents.
- **routes/**: Handles routing of API requests.
  - `student.route.js` - Routes related to student operations.
  - `task.route.js` - Routes related to task operations.
- **index.js**: Entry point of the application that sets up Express, connects to MongoDB, and defines the API routes.

## License
This project is licensed under the ISC License.

## Author
Michael Agonsi

---

Feel free to contribute by submitting issues or pull requests to improve the functionality or add new features.

## Download
You can download this README file by clicking [here](./README.md).
