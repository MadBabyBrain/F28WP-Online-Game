module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('move', (position) => {
            console.log('X: ' + position.positionX + ' Y: ' + position.positionY);
        });

    });


}