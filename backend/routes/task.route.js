const express = require("express");
const taskRouter = express.Router();

const {createTask,updateTask,getStudentTasks,deleteTask} = require('../controllers/task.controller.js');

taskRouter.get('/student/tasks/studentId=:studentId', getStudentTasks);
taskRouter.post('/student/tasks/create-task', createTask);
taskRouter.put('/student/tasks/id=:id',updateTask);
taskRouter.delete('/student/tasks/id=:id',deleteTask);

module.exports = taskRouter;
