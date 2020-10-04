const express = require('express');
const app = express();

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

module.exports = app;