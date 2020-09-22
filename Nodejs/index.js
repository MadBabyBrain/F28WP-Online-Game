const express = require("./API/node_modules/express");
const app = express();

//  PORT
const port = process.env.PORT || 3000;

//  routes
//
//  root URL
app.get('/', (req, res) => { 
    res.send("Hello world!");
});

// test object
var scores = {
    "name":["sample1", "sample2"],
    "score":[1,2]
};

app.get('/api/scores', (req, res) => {
    res.send(JSON.stringify(scores));
});

// /api/scores/1
app.get('/api/scores/:id', (req, res) => {
    var id = req.params.id;
    res.send(`Name: ${scores.name[id]}
    Score: ${scores.score[id]}`);
});

// /api/date/dd/mm/yyyy
app.get('/api/date/:day/:month/:year', (req, res) => {
    res.send(req.params);
    // query params
    // res.send(req.query);
});

// query params
// /api/date/dd/mm/yyyy?sortBy=name
// app.get('/api/date/:day/:month/:year', (req, res) => {
//     res.send(req.query);
// });



//
// app.post();
// app.put();
// app.delete();

app.listen(port, () => console.log(`Listening on port ${port}...`));