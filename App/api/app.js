const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user/users');
const loginRoute = require('./routes/user/account/login');
const signupRoute = require('./routes/user/account/signup');
const scoreRoute = require('./routes/score/scoreboard');
const homeRoute = require('./routes/home/home');
const gameRoute = require('./routes/game/game');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/users', userRoutes);
app.use('/users/account/login', loginRoute);
app.use('/users/account/signup', signupRoute);
app.use('/score', scoreRoute);
app.use('/home', homeRoute);
app.use('/game', gameRoute);

mongoose.connect(
    'mongodb://localhost:27017/mongoose-test', // TODO : enter the correct URL 
    {
        useMongoClient: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

// TODO : Handle Requests here

app.use((req, res, next) => {
    const err = new Error("Not found :(");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500); // 500 - all other kinds of errors
    res.json({
        error : {
            message : err.message
        }
    });
});

module.exports = app;