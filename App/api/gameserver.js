// access databse and verify web token
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

// schemas
const Score = require("./models/scoreboard");
const User = require("./models/user");

// object that holds all created rooms and their respective game states
let rooms = {
    "room-1": { // name of room will follow the format "room-"[number]
        gameState: {}, // game state will contain player information such as the x position, y position, id and sprite
        num_players: 0, // number of players in a given room
        locked: false,  // checks if max player count in room is reached
        // insession: false, // checks if game is in session
        choices: [], // choices that players have made in the round
        ids: []
    }
};

// sets min and max players for rooms
const min_player = 2;
const max_player = 64;
// sets total rooms to 1 to begin with, increments as more rooms are created
let current_available_room = 1;


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected ' + socket.id);

        // assigns the player in the gamestate a room id
        socket.on("update_state", (id, player) => {
            rooms[player.room].gameState[id] = {
                room: player.room
            };
        });

        // is called once client selects a sprite
        // constructs the player object and stores it into a room's gamestate
        socket.on('create_player', player => {
            // check to see is max players in a room
            if (rooms["room-" + current_available_room].num_players <= max_player && !rooms["room-" + current_available_room].locked) {
                rooms["room-" + current_available_room].gameState[socket.id] = {
                    x: player.positionX,
                    y: player.positionY,
                    sprite: player.sprite,
                    room: "room-" + current_available_room
                };
                // increase the number of players in a given room
                rooms["room-" + current_available_room].num_players++;

                // lock the room if max number of players is reached
                if (rooms["room-" + current_available_room].num_players === max_player) {
                    rooms["room-" + current_available_room].locked = true;
                }

                // start the game after 10 seconds once the minimum amount of players is reached
                if (rooms["room-" + current_available_room].num_players >= min_player) {
                    const room = current_available_room
                    setTimeout(() => {
                        rooms["room-" + room].locked = true;
                        io.in("room-" + room).emit('start_game', rooms["room-" + room].gameState);
                    }, 10000);
                }

            } else {    // if no rooms are available create a new room and add the player in the room
                let joined = false;
                for (room in rooms) {   // first check if previous rooms are available
                    if (!rooms[room].locked) { // check if room is locked
                        // add player to room
                        rooms[room].num_players++;
                        rooms[room].gameState[socket.id] = {
                            x: player.positionX,
                            y: player.positionY,
                            sprite: player.sprite,
                            room: "room-" + current_available_room
                        };

                        // lock room if max player count is reached
                        if (rooms[room].num_player === max_player) {
                            rooms[room].locked = true;
                            current_available_room++;
                        }

                        // check if player was able to join existing room
                        joined = true;
                        break;
                    }
                }

                // check if player was able to join an existing room
                if (!joined) {
                    // create new room if no room was available
                    current_available_room++;
                    rooms["room-" + current_available_room] = {
                        gameState: {},
                        num_players: 1,
                        locked: false,
                        // insession: false,
                        choices: [],
                        ids: []
                    };

                    rooms["room-" + current_available_room].gameState[socket.id] = {
                        x: player.positionX,
                        y: player.positionY,
                        sprite: player.sprite,
                        room: "room-" + current_available_room
                    };
                }
            }

            // subscribe socket to room
            socket.join("room-" + current_available_room);
            socket.emit("join_room", "room-" + current_available_room);
            console.log("joining room-" + current_available_room);

            // io.in(gameState[socket.id].room).emit('load_players', gameState);

            // emit to every client in a room the updated gamestate
            io.in("room-" + current_available_room).emit('load_players', rooms["room-" + current_available_room].gameState);

            // socket.to("room-" + current_available_room).emit('load_player', socket.id, rooms["room-" + current_available_room].gameState);
        });

        // called everytime a player moves
        socket.on('move', player => {
            // check if current room is in a game
            if (player.room != null) {
                if (rooms[player.room].locked == false) {
                    // update the gamestate of the client emitting this
                    rooms[player.room].gameState[player.id] = player;
                    // update other player's gamestates in the room 
                    socket.to(player.room).emit('update_players', player.id, { x: player.x, y: player.y });
                }
            }
        });

        // calls once game room timer hits 0
        socket.on('choice', data => {
            // console.log(data);
            console.log(data.choice)
            console.log(data.player.room)
            if (data.player.id !== null) {
                if (data.choice !== 0) {
                    rooms[data.player.room].choices.push(data.choice);
                    rooms[data.player.room].ids.push(data.player.id);
                }
                else {
                    rooms[data.player.room].choices.push(0)
                    io.to(data.player.id).emit('player_disconnect');
                }
            }
            console.log("Choices: " + rooms[data.player.room].choices.length)
            console.log("Choices: " + rooms[data.player.room].choices);
            console.log("Players: " + rooms[data.player.room].num_players)
            console.log("Choices length = number of players: " + rooms[data.player.room].choices.length == rooms[data.player.room].num_players);
            // console.log(rooms[data.player.room]);
            // rooms[data.player.room].choices.length === rooms[data.player.room].num_players
            if (rooms[data.player.room].choices.length == rooms[data.player.room].num_players) {
                // console.log(rooms[data.player.room].choices);
                // console.log(rooms[data.player.room].ids);
                calculate_Winner(data.player.room);
            }
            // else {
            //     rooms[data.player.room].locked = false;
            //     io.to(rooms[data.player.room].ids[data.player.id]).emit('win');
            // }

        });


        function calculate_Winner(roomid) {
            const possible_wins = {
                1: 3,  // rock vs scissors
                2: 1,  // paper vs rock
                3: 2   // scissors vs paper
            };

            console.log(rooms[roomid].num_players);

            if (rooms[roomid].num_players <= 1) {
                // console.log("I'm inside the if statement");
                rooms[roomid].locked = false;
                io.to(rooms[roomid].ids[0]).emit('win');
            } else {
                // calculates winners of rps battle
                for (i = 0; i < rooms[roomid].choices.length; i += 2) {
                    let first_choice = rooms[roomid].choices[i];
                    let first_id = rooms[roomid].ids[i];
                    // let second_choice = null;
                    // let second_id = null;

                    // if (rooms[roomid].choices[i + 1] !== null) {
                    let second_choice = rooms[roomid].choices[i + 1];
                    let second_id = rooms[roomid].ids[i + 1];
                    // }

                    console.log("first: " + first_choice + " " + "second: " + second_choice);
                    console.log("first: " + first_id + " " + "second: " + second_id);

                    if (first_choice === 0) {
                        console.log('second wins');
                        rooms[roomid].ids.splice(i, 1);
                        // io.to(first_id).emit('player_disconnect')
                        continue;
                    } else if (second_choice === 0) {
                        console.log('first wins');
                        rooms[roomid].ids.splice(i + 1, 1);
                        // io.to(second_id).emit('player_disconnect')
                        continue;
                    }


                    const player_win = possible_wins[first_choice];

                    if (first_choice === second_choice) {
                        continue;
                    } else if (player_win === second_choice) {
                        // second player loses - first player wins
                        console.log('first wins');
                        rooms[roomid].ids.splice(i + 1, 1);
                        io.to(second_id).emit('player_disconnect')
                        continue;
                    } else {
                        // second player wins - first player loses
                        console.log('second wins');
                        rooms[roomid].ids.splice(i, 1);
                        io.to(first_id).emit('player_disconnect')
                        continue;
                    }

                    // rock =  1, paper = 2, scissors = 3
                    // I'm sorry

                    // if (first_choice === second_choice) {
                    //     // tie
                    //     // both win
                    // }
                    // else if (first_choice == 0) {
                    //     console.log('second wins');
                    //     io.to(first_id).emit('player_disconnect')
                    // }
                    // else if (second_choice == 0) {
                    //     console.log('first wins');
                    //     io.to(second_id).emit('player_disconnect')
                    // }
                    // else if (first_choice == 1 && second_choice == 2) {
                    //     console.log('second wins');
                    //     io.to(first_id).emit('player_disconnect')
                    // }
                    // else if (first_choice == 1 && second_choice == 3) {
                    //     console.log('first wins');
                    //     io.to(second_id).emit('player_disconnect')
                    // }
                    // else if (first_choice == 2 && second_choice == 1) {
                    //     console.log('first wins');
                    //     io.to(second_id).emit('player_disconnect')
                    // }
                    // else if (first_choice == 2 && second_choice == 3) {
                    //     console.log('second wins');
                    //     io.to(first_id).emit('player_disconnect')
                    // }
                    // else if (first_choice == 3 && second_choice == 1) {
                    //     console.log('second wins');
                    //     io.to(first_id).emit('player_disconnect')
                    // }
                    // else if (first_choice == 3 && second_choice == 2) {
                    //     console.log('first wins');
                    //     io.to(second_id).emit('player_disconnect')
                    // }
                }

                if (rooms[roomid].num_players > 1) {
                    rooms[roomid].ids = [];
                    rooms[roomid].choices = [];
                    setTimeout(() => { io.in(roomid).emit('new_round', rooms[roomid].gameState); }, 10000);
                }
                else {
                    // rooms[roomid].locked = false;
                    io.to(rooms[roomid].ids[0]).emit('win');
                    // update score and show winning message
                }

            }



        }

        socket.on('increase_point', token => {
            console.log(token);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    console.log(err);
                }

                console.log(decoded);

                Score.findById(decoded.userId, (err, score) => {
                    if (err) {
                        console.log(err);
                    }

                    Score.updateOne({ _id: decoded.userId }, { score: (score.score + 1) }).exec();
                });
            });
        });

        // called when a client disconnects
        socket.on('disconnect', reason => {
            console.log("player " + socket.id + " disconnected...");

            // store id before it get removed
            const id = socket.id;
            let player = null;

            // get player object from room gamestate
            for (room in rooms) {
                // get the room the player was in
                if (rooms[room].gameState[id] !== null) {

                    // decrease the numbr of players in the room
                    if (rooms[room].num_players > 0) {
                        rooms[room].num_players--;
                    }

                    // unlock room as a player was removed
                    // rooms[room].locked = false;
                    player = rooms[room].gameState[id];
                    // delete player from the gamestate
                    delete rooms[room].gameState[id];

                    // remove the player from the room
                    if (!rooms[room].locked) {
                        socket.to(room).emit('remove_player', id);
                    }
                    // if empty room, delete to save memory + performance (like we care)
                    // performance really matters, lol said no one ever
                    if (rooms[room].num_players === 0) {
                        // DON'T DELETE FIRST ROOM - FOR THE LOVE OF GOD - RALF, I SWEAR, IF YOU DELETE IT, I WILL COME OVER TO "NORTHERN" IRELAND
                        if (room !== "room-1") {
                            delete rooms[room];
                            current_available_room--;
                            rooms["room-1"].locked = false;
                        }
                    }

                    break;
                }
            }
        });
    });
}
