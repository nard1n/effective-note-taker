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

let newNote = req.body;

  // create unique id for each new note
  newNote.id = db.length.toString();
  db.push(newNote);

  //turning the object to a string and write it to the db file
  fs.writeFile('./db/db.json', JSON.stringify(db), function(err) {
      if(err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        console.log("success");
        res.sendStatus(200);
      }
  });
});

// DELETE Request - delete note
app.delete('/api/notes/:id', function(req,res) {
  //looks within api/notes/:id route for note's specific id
  let deleteNote = req.params.id;
  //read db.json and parse into obj
  console.log(deleteNote);
   // notes = JSON.parse(data);

    //look through parsed obj for matching id as the id of the note being deleted. If matches, splice the note
    db.forEach(function(thisNote, i){
      if (thisNote.id.toString() === deleteNote) {
        db.splice(i, 1);

        fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
          if (err) throw err;
       });
      }
    });
    //stringify notes object so it can be rewritten to db.json file
    res.send("file");
});

// App Listener on set port
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});