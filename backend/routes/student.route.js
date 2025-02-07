const express = require("express");
const studentRouter = express.Router();

const {createStudentAccount, validateStudentAccount, viewStudentProfile, deleteStudentProfile} = require("../controllers/student.controller.js");

studentRouter.get('/login/studentId=:studentId', validateStudentAccount);
studentRouter.post('/create-student-account/', createStudentAccount);
studentRouter.get('/student-details/studentId=:studentId', viewStudentProfile);
studentRouter.delete('/delete-account/studentId=:studentId', deleteStudentProfile);

module.exports = studentRouter;