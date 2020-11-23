const socket = io();

const Player = {
  id: "",
  x: 0,
  y: 0,
  sprite: "",
  ref: null,
  room: ''
};

const interactables = document.getElementsByClassName("interactable");
// console.log(interactables);
const interact_coords = {
  rock: {},
  paper: {},
  scissors: {}
};

window.addEventListener("onbeforeunload", function () {
  socket.disconnect();
});

socket.on('remove_player', id => {
  document.getElementById(id).remove();
})

socket.on('load_players', gs => {
  console.log("cum")

  for (p in gs) {
    console.log(p + " : " + gs[p].room)
    console.log(Player.id + " : " + Player.room)
    console.log(gs[p].room === Player.room)
    if (p != Player.id) {
      if (gs[p].room !== Player.room) {
        if (!document.getElementById(p)) {
          const player = document.createElement('IMG');
          player.setAttribute("class", "player");
          player.setAttribute("id", p);
          player.src = gs[p].sprite + '.png';
          document.body.insertBefore(player, document.getElementById("buttons"));
          //set initialise player
          player.style.left = gs[p].x + "px";
          player.style.top = gs[p].y + "px";
        }
      }
    }
  }
});


socket.on('load_player', (id, gs) => {
  const player = document.createElement('IMG');
  // player.setAttribute("src", "../images/" + gs[gs.id].sprite + ".png");
  player.setAttribute("class", "player");
  player.setAttribute("id", id);
  player.src = gs[id].sprite + ".png";
  document.body.insertBefore(player, document.getElementById("buttons"));
  // console.log(player);
  //set initialise player
  player.style.left = gs[id].x + "px";
  player.style.top = gs[id].y + "px";
});


socket.on('update_players', (players) => {
  let player = document.getElementById(players.id);
  player.style.left = players.x + "px";
  player.style.top = players.y + "px";
});


const movementSpeed = 10;
var pressedKeys = {};

/*
If a key is pressed then set the index corrosponding with the keycode that
has been pressed to true. If the key is no longer being pressed then set the
corrosponding index with the keycode that is no longer being pressed to false
*/
document.addEventListener('keydown', event => {
  pressedKeys[event.keyCode] = true
});

document.addEventListener('keyup', event => {
  pressedKeys[event.keyCode] = false
})



/*
Check if any valid keys have been pressed and move the player accordingly
Call this function every 33ms so that the game runs at 30fps
*/
setInterval(function runController() {
  var keys = [65, 68, 87, 83]
  for (i = 0; i < keys.length; i++) {
    if (pressedKeys[keys[i]]) {
      movePlayer(keys[i])
    }
  }
}, 33);


/*
Move the player according to what key as been pressed.
Convert the current x or y position to in integer then add/subtract 1 multiplyed by
the movement speed. Convert this back to px and set the new x or y position.
*/
function movePlayer(key) {
  switch (key) {
    case 65:
      Player.x = parseInt(Player.ref.style.left, 10) - movementSpeed
      Player.ref.style.left = Player.x + "px"
      break
    case 68:
      Player.x = parseInt(Player.ref.style.left, 10) + movementSpeed
      Player.ref.style.left = Player.x + "px"
      break
    case 87:
      Player.y = parseInt(Player.ref.style.top, 10) - movementSpeed
      Player.ref.style.top = Player.y + "px"
      break
    case 83:
      Player.y = parseInt(Player.ref.style.top, 10) + movementSpeed
      Player.ref.style.top = Player.y + "px"
      break
  }

  // console.log(Player)
  socket.emit('move', Player);
};

function showGamestate() {
  socket.emit('show_game_state');
};