const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    studentNumber: {
        type:Number,
        required: [true,'Student number is required'],
        unique: true
    },
    name: {
        type:String,
        required:[true, "Name is required"]
    },
    email: {
        type:String,
        unique: true,
        required: [true, "Email is required"]
    },
    program: {
        type:String,
        required: true,
    },
    schoolName: {
        type:String,
        required: true,
    },
   
    password: {
        type: String,
        required: [true,'Invalid Password']
    }
},
{
    timestamps:true
})


const Student = mongoose.model('student', StudentSchema);

module.exports = Student;