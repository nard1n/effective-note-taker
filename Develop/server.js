const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const db = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 8080;
// Routes
// =============================================================
// Telling express to look to public folder for files
app.use(express.static('public'));

// Basic route that sends the user first to the AJAX Page
// specifying routes to direct users to
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
  });

// Displays notes
app.get('/api/notes', function(req, res) {
    return res.json(db);
  });

// updates
app.post('/api/notes', function(req, res) {
    return res.json(db);
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

// app listen setting port
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});