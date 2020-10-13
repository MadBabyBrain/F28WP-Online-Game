const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');

const userRoutes = require('./routes/user/users');
const loginRoute = require('./routes/user/account/login');
const signupRoute = require('./routes/user/account/signup');
const scoreRoute = require('./routes/score/scoreboard');

app.use(morgan('dev'));
app.user(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/users', userRoutes);
app.use('/users/account/login', loginRoute);
app.use('/users/account/signup', signupRoute);
app.use('/score', scoreRoute);

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