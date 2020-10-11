const express = require('express');
const app = express();

const userRoutes = require('./routes/user/users');
const loginRoute = require('./routes/user/account/login');
const signupRoute = require('./routes/user/account/signup');
const scoreRoute = require('./routes/score/scoreboard');

app.use('/users', userRoutes);
app.use('/users/account/login', loginRoute);
app.use('/users/account/signup', signupRoute);

app.use('/score', scoreRoute);

module.exports = app;