const Joi = require("./API/node_modules/joi");
const express = require("./API/node_modules/express");
const app = express();

// enable JSON parsing - not enable in express by default
app.use(express.json());

//  PORT
const port = process.env.PORT || 3000;

//  routes
//
//  root URL
app.get('/', (req, res) => { 
    res.send("Hello world!");
});

// test array of objects
const scores = [
    {"id":0, "name":"user1", "score":1},
    {"id":1, "name":"user2", "score":2},
    {"id":2, "name":"user3", "score":3}
];

app.get('/api/scores', (req, res) => {
    res.send(scores);
});

// /api/scores/1
app.get('/api/scores/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const score = scores.find(c => c.id === id);
    // 404
    if(!score) return res.status(404).send("The score with the given ID was not found");
    //else
    res.send(score);
});

// reponding to post from HTML
app.post('/api/scores', (req, res) => {
    // validate
    //const result = validateScore(req.body);
    const { error } = validateScore(req.body); // object destructuring - result.error

    // ! Replaced by Joi module for efficeint post validation !
    // look up how to validate post data more efficiently
    // if(!req.body.name || req.body.name.length < 3) {
    //     // 400 - bad request
    //     res.status(400).send("Name is required - minimum 3 characters");
    //     return;
    // }

    // if(!req.body.score) {
    //     // 400 - bad request
    //     res.status(400).send("Score is required");
    //     return;
    // }

    if(error) {
        // 400 - bad request
        // res.status(400).send(result.error);
        return res.status(400).send(error.details[0].message); //easier for client to read
    }

/* 
    try {
        const result = schema.validate(req.body);
        console.log(result);
    } catch (err) {
        // 400 - bad request
        res.status(400).send(err);
    } */

    const score = { // maunually added data. Future revisions will let MongoDB populate object
        "id": scores.length +1,
        "name": req.body.name,
        "score": req.body.score
    };

    scores.push(score);
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

app.listen(port, () => console.log(`Listening on port ${port}...`));