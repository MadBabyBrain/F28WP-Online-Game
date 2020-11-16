// exports
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const setuproutes = require('./app');
const iosocket = require('./gameserver');

const port = process.env.PORT || 3000;

setuproutes(app);
iosocket(io);

http.listen(port, () => {
    console.log(`listening on ${port}`);
});