let gameState = {};
let rooms = {};

module.exports = (io) => {

    make_rooms();

    io.on('connection', (socket) => {

        add_player();

        function add_player() {
            gameState[socket.id] = {
                id: socket.id,
                sprite: '',
                x: 0,
                y: 0,
                ref: null,
                room: null
            };
        }

        function gotoroom() {
            joined = false;
            for (i = 1; joined == false; i++) {
                if (rooms[`${i}`].insession == false && rooms[`${i}`].players < 2) {
                    console.log('Room: ' + `${i}`);
                    socket.join(`${i}`);
                    gameState[socket.id].room = `${i}`;
                    rooms[`${i}`].players++;
                    joined = true;
                    return i;
                }
            }

        }


        socket.on('show_game_state', () => {
            // console.log(rooms)
            for (players in gameState) {
                console.log(players)
                console.log(gameState[players])
            }
        });


        // socket.emit('load_players', gameState);

        socket.on('create_player', player => {
            gameState[player.id] = {
                id: player.id,
                sprite: player.sprite,
                x: player.x,
                y: player.y,
                ref: player.ref,
                room: player.room
            };
            gotoroom();

            console.log(gameState[socket.id].room);

            io.in(gameState[socket.id].room).emit('load_players', gameState);

            // socket.to(player.room).emit('load_player', player.id, gameState);
            // socket.broadcast.emit('load_player', player.id, gameState);
        });


        socket.on('move', player => {
            gameState[player.id] = player;
            // socket.broadcast.emit('update_players', gameState[player.id]);
            socket.to(gameState[player.id].room).emit('update_players', gameState[player.id]);
        });


        socket.on('round_finish', (roomid, choice) => {
            rooms[roomid].choices.push(choice);
        });


        socket.on('disconnect', reason => {
            console.log("player " + socket.id + " disconnected...");
            const id = socket.id;
            delete gameState[id];
            socket.broadcast.emit('remove_player', id);
        });
    });
}





function calculate_winners(roomid) {

}


function make_rooms() {
    for (i = 1; i <= 50; i++) {
        rooms[i] = {
            players: 0,
            insession: false,
            choices: []
        };
    }
}
