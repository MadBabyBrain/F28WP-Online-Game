const { SSL_OP_NO_TICKET } = require('constants');
const express = require('express');
const router = express.Router();
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http);

io.on('connection', (socket) => {
    console.log('a user connected');
})

io.on('move', (socket) => {
    console.log('Test')
});

module.exports = router;