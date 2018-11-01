const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require('path');
const mongoose = require("mongoose");

// Require all models
const db = require("./models");

const Router = require('./routes/index');

const PORT = 3000;

// Initializa Express
const app = express();

let exphbs = require("express-handlebars");

// Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.static(path.join(_dirname, 'public')));
app.use('/', Router);

// User body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as static directory
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoscraperdb", { userNewUrlParser: true});

// Start the server
app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
});

module.exports = app;