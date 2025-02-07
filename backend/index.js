// this sets up the express for use for our apis and handling api requests
const express = require('express');
const app = express();
const port = 5352;

// handles the cors problem
const cors = require('cors');
app.use(cors());

// gets mongoose database dependency
const mongoose = require('mongoose');

// sets up the respective routes that needs to be use by express app
const taskRoute = require ("./routes/task.route.js");
const studentRoute = require("./routes/student.route.js");



app.get('/', (req, res) => {
    res.send(`<h1>Testing the Schoolwork Tracker App API</h1>`);
})


// maps the respective url to the routes defined
app.use(express.json());
app.use ("/schoolwork-tracker/tasks/", taskRoute);
app.use("/schoolwork-tracker/students", studentRoute);



// having the api connect to the database

mongoose.connect('<your mongodb connection string>', { dbName: 'schoolworktracker' })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log(`Schoolwork Tracker Server is listening on port ${port}`);
        });
    })
    .catch(() => {
        console.log("Failed to connect to the database.");
    });
