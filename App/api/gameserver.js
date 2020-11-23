<<<<<<< Updated upstream
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('move', (position) => {
            console.log('X: ' + position.positionX + ' Y: ' + position.positionY);
=======
let gameState = {};
let rooms = {
}

module.exports = (io) => {
    io.on('connection', (socket) => {
        // setTimeout(() => { socket.emit('load_players', gameState); }, 1000);


        socket.on('show_game_state', () => {
            make_rooms();
            console.log(rooms)
            for (players in gameState) {
                console.log(players)
                console.log(gameState[players])
            }
        });

        socket.on('create_player', player => {
            gameState[player.id] = {
                id: player.id,
                sprite: player.sprite,
                x: player.x,
                y: player.y,
                ref: player.ref
            };
            socket.emit('load_players', gameState);

            // socket.emit('load_player', gameState[player.id])
        });

        socket.on('move', player => {
            gameState[player.id] = player;
            socket.emit('update_players', gameState[player.id]);
        });

        socket.on('round_finish', (roomid, choice) => {
            rooms[roomid].choices.push(choice);
        });

        socket.on('disconnect', reason => {
            console.log("player " + socket.id + " disconnected...");
            const id = socket.id;
            delete gameState[socket.id];
            console.log(gameState[id]);
            socket.broadcast.emit('remove_player', id);
>>>>>>> Stashed changes
        });

    });

}



function calculate_winners(roomid) {

}


function make_rooms() {
    for (i = 1; i <= 50; i++) {
        rooms[`${i}`] = { choices: [] };
    }
}
