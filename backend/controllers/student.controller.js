const Student = require ("../models/student.model.js");
const Task = require("../models/task.model.js");


//createNewStudent
const createStudentAccount = async (req,res) =>{
    try{
        const newAcct = await Student.create(req.body);
        res.status(201).json(newAcct);
    }
    catch(err){
        res.status(400).json({message:"There was problem creating new account"});
    }
};

// loginStudent, gets student password to verify on the front end.
const validateStudentAccount = async (req, res) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required." });
        }
        const validStudent = await Student.aggregate([
            {
                $match: { studentNumber: Number(studentId) },
            },
            {
                $project: {
                     
                    password: 1, 
                    _id: 1,
                },
            },
        ]);
        if (validStudent.length === 0) {
            return res.status(404).json({ message: "Student not found." });
        }
        res.status(200).json({userID:validStudent[0]._id, password: validStudent[0].password });
    }  catch (err) {
        res.status(500).json({ message: `Error validating student: ${err.message}` });
    }
};

// view student profile
const viewStudentProfile = async (req, res) => {
    try{
        const { studentId } = req.params;
        const studentProfile = await Student.aggregate([
            {$match: {studentNumber: Number(studentId)},
        },
        {
            $project: {
            _id:0,
            password:0
            },
        },
        ]);
        if(studentProfile.length === 0){
            return res.status(400).json({message:"Student not found"});
        }
        res.status(200).json(studentProfile);
    } catch(err){
        res.status(500).json({message: 'Something went wrong'});
    }
}

// delete student
const deleteStudentProfile = async (req, res) => {
    try {
        const { studentId } = req.params;
        const studentToDelete = await Student.findOne({studentNumber:studentId});
        const userId = studentToDelete._id;
        const tasks = await Task.deleteMany({studentNumber:userId});
        if (tasks.deletedCount >= 0){

            const student = await Student.deleteOne({studentNumber:studentId});
            if (!student) {
                return res.status(400).json({message: "Student not found"});
            }
            if(student.deletedCount === 0){
                res.status(404).json({message:"Student not found"});
            }
            else{
                res.status(200).json({ message: "Student deleted."});
            }}
        
    }
    catch (err) {
        res.status(500).json({ message: err.message});
    } 
};


module.exports = {
    createStudentAccount, validateStudentAccount, viewStudentProfile, deleteStudentProfile
};