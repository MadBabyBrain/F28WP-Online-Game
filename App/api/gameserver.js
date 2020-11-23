let gameState = {};
let rooms = {
    "room-1" : {
        num_players : 0,
        locked : false
    }
};
let num_of_people_in_room = 0;
let current_available_room = 1;
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected ' + socket.id);

        socket.on("update_state", (id, player) => {
            gameState[id] = {
                x : player.positionX,
                y : player.positionY,
                sprite : player.sprite,
                room : player.room
            };
        });

        socket.on('create_player', player => {
            gameState[player.id] = {
                x : player.positionX,
                y : player.positionY,
                sprite : player.sprite,
                room : player.room
            };

            //console.log(gameState);
            if(rooms["room-"+current_available_room].num_players < 2) {
                rooms["room-"+current_available_room].num_players++;
            } else {
                let joined = false;
                for (room in rooms) {
                    if(!room.locked && room.num_players < 64) {
                        room.num_players++;

                        if(room.num_players > 8) {
                            // TODO : play the game + lock room
                        }

                        joined = true;
                        break;
                    }
                }
                
                if (!joined) {
                    current_available_room++;
                    rooms["room-"+current_available_room] = {
                        num_players : 1,
                        locked : false
                    }
                }
            }

            socket.join("room-"+current_available_room);
            socket.emit("join_room", current_available_room);
            console.log("joining room-"+current_available_room);

            console.log(rooms);

            io.in("room-"+current_available_room).emit('load_players', gameState);
            socket.to("room-"+current_available_room).broadcast.emit('load_player', socket.id, gameState);
        });

        socket.on('move', player => {
            //console.log('X: ' + player.x + ' Y: ' + player.y);
            gameState[player.id] = player;

            socket.to("room-"+player.room).broadcast.emit('update_players', player.id, {x : player.x, y : player.y});
        });

        socket.on('disconnect', reason => {
            console.log("player " + socket.id + " disconnected...");

            if ( Object.keys(gameState).length !== 0 && gameState.constructor !== Object ) {
                const id = socket.id;
                const room = gameState[socket.id].room;
                delete gameState[socket.id];

                rooms["room-"+room].num_players--;

                if (rooms["room-"+room].num_players === -1) {
                    delete rooms["room-"+current_available_room];
                    current_available_room--;
                }

                console.log(rooms);
                socket.broadcast.emit('remove_player', id);
            }
        });

    });


}