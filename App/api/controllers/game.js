const express = require('express');
const router = express.Router();
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


io.on('connection', (socket) => {
    console.log('a user connected');
})

module.exports = router;