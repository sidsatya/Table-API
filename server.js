const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// configure database
const db = "mongodb://localhost:27017/table_api"

// parse json and x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to the database
mongoose.connect(db, function(err, res) {
    if (err) {
        console.log("Could not connect to the database, exiting now...");
        process.exit();
    }
    console.log("Successfully connected to the database...");
});

// Require routes
require('./app/routes/table.routes.js')(app);

// listen for requests
app.listen(3000, function() {
    console.log("Server is listening on port 3000...");
});
