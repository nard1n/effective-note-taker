const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');
const db = require('./db/db.json');
const app = express();

let notes;

// Parse Data
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
// Telling express to look to public folder to parse asset files
app.use(express.static('public'));

// Routes
// =============================================================
// GET request - sends the user first to the AJAX Page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
  });

// Displays parsed notes
app.get('/api/notes', function(req, res) {
    return res.json(db);
  });

// POST Request - update notes

app.post('/api/notes', function(req, res) {

    fs.readFile('./db/db.json', function (err, data) {
        if (err) throw err;

        notes = JSON.parse(data);
        notes.push(req.body);

        // create unique id for each new note
        notes.forEach( function(item, i){
            item.id = 1 + i;
        });

        //turning the object to a string and write it to the db file
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err) {
            if(err) throw err;
        });
    });
    //send new note as response
    res.json(req.body);
});

// DELETE Request - delete note
app.delete('api.notes/:id', function(req,res) {
  
});

// App Listener on set port
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});