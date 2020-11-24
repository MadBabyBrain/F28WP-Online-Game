<<<<<<< Updated upstream
let gameState = {};
let rooms = {};
=======
let rooms = {
    "room-1": {
        gameState: {},
        num_players: 0,
        locked: false
    }
};

const min_player = 2;
const max_player = 4;
let current_available_room = 1;

>>>>>>> Stashed changes

module.exports = (io) => {

    make_rooms();

    io.on('connection', (socket) => {
<<<<<<< Updated upstream

        add_player();

        function add_player() {
            gameState[socket.id] = {
                id: socket.id,
                sprite: '',
                x: 0,
                y: 0,
                ref: null,
                room: null
=======
        console.log('a user connected ' + socket.id);


        socket.on("update_state", (id, player) => {
            rooms[player.room].gameState[id] = {
                room: player.room
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream

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
=======

        socket.on('create_player', player => {
            //console.log(gameState);
            if (rooms["room-" + current_available_room].num_players <= max_player && !rooms["room-" + current_available_room].locked) {
                rooms["room-" + current_available_room].gameState[socket.id] = {
                    x: player.positionX,
                    y: player.positionY,
                    sprite: player.sprite,
                    room: "room-" + current_available_room
                };

                rooms["room-" + current_available_room].num_players++;

                if (rooms["room-" + current_available_room].num_players === max_player) {
                    rooms["room-" + current_available_room].locked = true;
                }

                if (rooms["room-" + current_available_room].num_players >= min_player) {
                    setTimeout(() => { socket.emit('start_game'); }, 10000);
                }

            } else {
                let joined = false;
                for (room in rooms) {
                    if (!rooms[room].locked) {
                        rooms[room].num_players++;
                        rooms[room].gameState[socket.id] = {
                            x: player.positionX,
                            y: player.positionY,
                            sprite: player.sprite,
                            room: "room-" + current_available_room
                        };

                        if (rooms[room].num_player === max_player) {
                            rooms[room].locked = true;
                            current_available_room++;
                        }

                        joined = true;
                        break;
                    }
                }

                if (!joined) {
                    current_available_room++;
                    rooms["room-" + current_available_room] = {
                        gameState: {},
                        num_players: 1,
                        locked: false
                    };

                    rooms["room-" + current_available_room].gameState[socket.id] = {
                        x: player.positionX,
                        y: player.positionY,
                        sprite: player.sprite,
                        room: "room-" + current_available_room
                    };
                }
            }

            socket.join("room-" + current_available_room);
            socket.emit("join_room", "room-" + current_available_room);
            console.log("joining room-" + current_available_room);
>>>>>>> Stashed changes

            io.in(gameState[socket.id].room).emit('load_players', gameState);

<<<<<<< Updated upstream
            // socket.to(player.room).emit('load_player', player.id, gameState);
            // socket.broadcast.emit('load_player', player.id, gameState);
=======
            io.in("room-" + current_available_room).emit('load_players', rooms["room-" + current_available_room].gameState);

            // socket.to("room-" + current_available_room).emit('load_player', socket.id, rooms["room-" + current_available_room].gameState);
>>>>>>> Stashed changes
        });


        socket.on('move', player => {
<<<<<<< Updated upstream
            gameState[player.id] = player;
            // socket.broadcast.emit('update_players', gameState[player.id]);
            socket.to(gameState[player.id].room).emit('update_players', gameState[player.id]);
        });


        socket.on('round_finish', (roomid, choice) => {
            rooms[roomid].choices.push(choice);
=======
            //console.log('X: ' + player.x + ' Y: ' + player.y);
            rooms[player.room].gameState[player.id] = player;
            socket.to(player.room).emit('update_players', player.id, { x: player.x, y: player.y });
>>>>>>> Stashed changes
        });


        socket.on('disconnect', reason => {
            console.log("player " + socket.id + " disconnected...");
            const id = socket.id;
            delete gameState[id];
            socket.broadcast.emit('remove_player', id);
        });
    });
}

<<<<<<< Updated upstream




function calculate_winners(roomid) {

}
=======
            const id = socket.id;
            let player = null;

            // get player object from room gamestate
            for (room in rooms) {
                if (rooms[room].gameState[id] !== null) {
                    room_id = room;

                    if (rooms[room].num_players > 0) {
                        rooms[room].num_players--;
                    }

                    rooms[room].locked = false;
                    player = rooms[room].gameState[id];
                    delete rooms[room].gameState[id];

                    // remove the player from the room
                    socket.to(room).emit('remove_player', id);
>>>>>>> Stashed changes

                    // if empty room, delete to save memory + performance (like we care)
                    // performance really matters, lol said no one ever
                    if (rooms[room].num_players === 0) {
                        // DON'T DELETE FIRST ROOM - FOR THE LOVE OF GOD - RALF, I SWEAR, IF YOU DELETE IT, I WILL COME OVER TO "NORTHERN" IRELAND
                        if (room !== "room-1") {
                            delete rooms[room];
                            current_available_room--;
                        }
                    }

<<<<<<< Updated upstream
function make_rooms() {
    for (i = 1; i <= 50; i++) {
        rooms[i] = {
            players: 0,
            insession: false,
            choices: []
        };
    }
=======
                    break;
                }
            }
        });
    });
>>>>>>> Stashed changes
}
