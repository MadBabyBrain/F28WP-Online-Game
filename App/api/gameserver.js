module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        console.log(socket.handshake.address);
    });

    io.on('move', (socket) => {
        console.log('player has moved');
    });
}