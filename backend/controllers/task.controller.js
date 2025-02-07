const Task = require ("../models/task.model.js");
const mongoose = require('mongoose');

//get all tasks based on studentid
const getStudentTasks = async (req,res) => {
    try{
        const {studentId} = req.params;
        if (!studentId){
            return res.status(400).json({message: "Student ID is required"});
        }
        const studentTasks = await Task.aggregate([
            {
                $match: {studentNumber: new mongoose.Types.ObjectId(studentId)}
            },
        ]);
        if(studentTasks.length === 0){
            return res.status(404).json({message: "No task found for current student"});
        }
        res.status(200).json(studentTasks);
    }
    catch(err) {
        res.status(500).json({message:"Something went wrong: ",error: err.message})
    }
}

//create new task
const createTask = async (req,res) => {
    try{
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    }
    catch(err){
        res.status(400).json({message:"There was problem creating new task"})
    }
};


//update task status
const updateTask = async (req,res)=>{
    try{
        const allowedStatuses = ["Pending", "Completed"];
        if (!allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if(!task){
            res.status(404).json({message: "Task does not exist"});
            
        }
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

//delete task
const deleteTask = async (req,res) => {
    try{
        const {id} = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask){
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({message: "Task deleted."})
    }
    catch(err){
        res.status(500).json({message: "Something went wrong",error: err.message})
    }
}

module.exports = {
    createTask,updateTask,getStudentTasks,deleteTask
}