// exports
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const setuproutes = require('./app');
const iosocket = require('./gameserver');

const port = process.env.PORT || 3000;

mongoose.connect(
    "mongodb+srv://f28wp-2020-localhost:zwmPRsiZiLCnrZzp@f28wp-2020-localhost.jbitk.mongodb.net/online-game?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.Promise = global.Promise;



setuproutes(app);
iosocket(io);

http.listen(port, () => {
    console.log(`listening on ${port}`);
});