// Dependencies

const express = require('express');
const path = require('path');

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

app.get('/notes', function (req, res) {
    res.sendFile('notes.html', {root: 'public'});
})


app.get('/api', function (req, res) {
    res.send(JSON.stringify(Date.now()));
})

app.post('/api/text', function (req, res) {
    // let hello = {hi: me};
    console.log(req.body.whatever);
})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});