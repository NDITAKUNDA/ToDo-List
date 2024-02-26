// requiring and initalizing all the required modules
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

// initialising the app
const app = express();

// serving the static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// setting the view engine 
app.set('view engine', 'ejs');

// connecting to the database
mongoose.connect("mongodb+srv://tnyanara:l2aevb6KubujR46k@cluster0.6h884av.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(
    console.log("Connection Successful")
);

// Using routes
app.use("/", require("./routes/routes"))

// setting up the port to listen to
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  
