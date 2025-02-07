const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema ({
    studentNumber: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Student model
        ref: "student",
        required: true,
    },
    course:{
        type:String,
        required: [true, "Course is required"],
    },
    description: {
        type: String,
        required:[true, "Description is required"]
    },
    dueDate: {
        type: Date,
        required:[true, "Due date is required"]
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Completed"],
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
},
{ 
    timestamps: true
})


//creates the Student model
const Task = mongoose.model("Task", TaskSchema);

//makes this model available
module.exports = Task;