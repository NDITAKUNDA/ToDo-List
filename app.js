// requiring and initalizing all the required modules
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

// initialising the app
const app = express();

databaseConnectionURL = 'mongodb://localhost:27017/toDoList';

// serving the static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// setting the view engine 
app.set('view engine', 'ejs');

// Using routes
app.use("/", require("./routes/routes"))

// connecting to the database
mongoose.connect(databaseConnectionURL)
.then(() => {
    console.log("Connection Successful");
    app.listen(3000, function() {
        console.log("Server started on port 3000");
    });
})
.catch(error => {
    console.error("Error connecting to MongoDB:", error);
});

