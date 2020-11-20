let gameState = {};
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected ' + socket.id);

        socket.emit('load_players', gameState);

        socket.on('create_player', player => {
            gameState[player.id] = {
                x : player.positionX,
                y : player.positionY,
                sprite : player.sprite
            };

            //console.log(gameState);

            socket.broadcast.emit('load_player', socket.id, gameState);
        });

        socket.on('move', player => {
            //console.log('X: ' + player.x + ' Y: ' + player.y);
            gameState[player.id] = player;

            socket.broadcast.emit('update_players', player.id, {x : player.x, y : player.y});
        });

        socket.on('disconnect', reason => {
            console.log("player " + socket.id + " disconnected...");
            const id = socket.id;
            delete gameState[socket.id];
            console.log(gameState);
            socket.broadcast.emit('remove_player', id);
        });

    });


}