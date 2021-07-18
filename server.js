// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.sendFile('index.html');
})

//makes root directory 'public' folder
app.get('/notes', function (req, res) {
    res.sendFile('notes.html', { root: 'public' });
})

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
});

app.post('/api/notes', function (req, res) {
    fs.readFile(path.join(__dirname, "db.json"), "utf8", function (error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        const newNoteId = notes.length + 1;
        const newNote = {
            id: newNoteId,
            title: noteRequest.title,
            text: noteRequest.text
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), function (err) {
            if (err) throw err;
        });
    });
});


// Deleting note from notes list
app.delete("/api/notes/:id", function (req, res) {
    const deleteId = req.params.id;
    fs.readFile("db.json", "utf8", function (error, response) {
        if (error) {
            console.log(error);
        }
        let notes = JSON.parse(response);
        if (deleteId <= notes.length) {
            // Method to remove an element from an array
            res.json(notes.splice(deleteId - 1, 1));
            // Reassign the ids of all notes
            for (let i = 0; i < notes.length; i++) {
                notes[i].id = i + 1;
            }

            fs.writeFile("db.json", JSON.stringify(notes, null, 2), function (err) {
                if (err) throw err;
            });
        } else {
            res.json(false);
        }
    });
});


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on http://localhost:3000", PORT);
});