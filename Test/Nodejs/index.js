const Joi = require("joi");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = MongoClient(uri, { useUnifiedTopology: true });

const dbName = "Online-game-test";
const colName = "Users";

// enable JSON parsing - not enable in express by default
app.use(express.json());

//  PORT
const port = process.env.PORT || 3000;
//  routes -- move to another file
//
//  root URL
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/node_modules/socket.io-client/dist/')));

app.get('/', (req, res) => {
    res.sendFile("public/HTML/Home.html", {root: __dirname});
});

// game.html
app.get('/Game.html', (req, res) => {
    res.sendFile("public/HTML/Game.html", {root: __dirname});
});

// connect signal
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('hi', msg);
      });

    // disconnect signal
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

app.use("/JavaScript", express.static(path.join(__dirname, 'JavaScript')));
app.use("/favicon", express.static(path.join(__dirname, 'favicon')));

app.get('/api/scores', (req, res) => {
    client.connect();
    const database = client.db(dbName);
    const collection = database.collection(colName);

    collection.find({}).toArray((err, result) => {
        if(err) throw err;
        res.send(result);
    });

    client.close();
});

// /api/scores/1
app.get('/api/scores/:id', (req, res) => {
    client.connect();
    const database = client.db(dbName);
    const collection = database.collection(colName);

    let pId = parseInt(req.params.id); // add validation
    //const score = scores.find(c => c.id === id);
    const query = { id: pId };
      
      collection.findOne(query, (err, score) => {
          if (err) throw err;
          res.send(score)
        });

       // Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});
    // 404
/*     if((cursor.count()) == 0) {
        res.status(404).send("The score with the given ID was not found");
    } else {
        cursor.rewind();
        cursor.each(score => res.send(score));
    } */
    client.close();
});

// reponding to post from HTML
app.post('/api/scores', (req, res) => {
    console.log('scores')
    // validate
    //const result = validateScore(req.body);
    const { error } = validateScore(req.body); // object destructuring - result.error

    if(error) {
        // 400 - bad request
        // res.status(400).send(result.error);
        return res.status(400).send(error.details[0].message); //easier for client to read
    }

    const score = { // maunually added data. Future revisions will let MongoDB populate object
        "id": scores.length +1,
        "name": req.body.name,
        "score": req.body.score
    };

    scores.push(score);
    io.emit("update table", scores);
    res.send(score);
});

// dealing with put requests/updating resources
app.put('/api/scores/:id', (req, res) => {
    // Look up the course
    // If not exist - 404 - not found
    let id = parseInt(req.params.id);
    const score = scores.find(c => c.id === id);
    if(!score) return res.status(404).send("The score with the given ID was not found");

    // else
    // Validate
    const { error } = validateScore(req.body);
    
    // if invalid - 400 - bad request
    if(error) {
        // 400 - bad request
        // res.status(400).send(result.error);
        return res.status(400).send(error.details[0].message); //easier for client to read
    }

    // update
    score.name = req.body.name;
    score.score = req.body.score;
    // return update
    res.send(score);

});

function validateScore(score) {
    const schema = Joi.object({
        "name": Joi.string()
                .min(3)
                .required(),

        "score": Joi.number()
                .integer()
                .min(0)
                .required()
    });

    return schema.validate(score);
}

// handling HTTP delete ops
app.delete('/api/scores/:id', (req, res) => {
    // Look up the course
    // If not exist - 404 - not found
    let id = parseInt(req.params.id);
    const score = scores.find(c => c.id === id);
    if(!score) return res.status(404).send("The score with the given ID was not found");

    // Delete
    const index = scores.indexOf(score);
    scores.splice(index, 1);

    // return the same score
    res.send(score); 
});

http.listen(port, () => console.log(`Listening on port ${port}...`));