const socket = io();
const Player = {
  id : "",
  x : 0,
  y : 0,
  sprite : "",
  ref : null
};

const interactables = document.getElementsByClassName("interactable");
console.log(interactables);
const interact_coords = {
  rock : {},
  paper : {},
  scissors : {}
};

window.addEventListener("onbeforeunload", function() {
  socket.disconnect();
});

socket.on('remove_player', id => {
  document.getElementById(id).remove();
})

socket.on('load_players', gs => {
  for (p in gs) {
    const player = document.createElement('IMG');
    player.setAttribute("class", "player");
    player.setAttribute("id", p);
    document.body.insertBefore(player, document.getElementById("buttons"));

    //set initialise player
    player.style.left = gs[p].x + "px";
    player.style.top = gs[p].y + "px";
  }
});

socket.on('update_players', (id, pos) => {
  let player = document.getElementById(id);
  player.style.left = pos.x + "px";
  player.style.top = pos.y + "px";
});

let playerObj = {
  positionX: Math.floor(Math.random() * 600 + 100),
  positionY: Math.floor(Math.random() * 400 + 100),
  image: "../images/character_facing_down.png"
}

// var image = document.createElement("IMG")
// image.src = image
// player.appendChild(image)

socket.on('load_player', (id, gs) => {
  const player = document.createElement('IMG');
  player.setAttribute("class", "player");
  player.setAttribute("id", id);
  document.body.insertBefore(player, document.getElementById("buttons"));

  //set initialise player
  player.style.left = gs[id].x + "px";
  player.style.top = gs[id].y + "px";
});

function createPlayer() {
  const player = document.createElement('IMG');
  player.setAttribute("class", "player");
  player.setAttribute("id", socket.id);
  document.body.insertBefore(player, document.getElementById("buttons"));

  //set initialise player
  player.style.left = playerObj.positionX + "px";
  player.style.top = playerObj.positionY + "px";

  Player["id"] = socket.id;
  Player["x"] = playerObj.positionX;
  Player["y"] = playerObj.positionY;
  Player["ref"] = document.getElementById(Player.id);

  socket.emit('create_player', playerObj, socket.id);
}



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
  console.log(key);

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
  console.log(Player.x, Player.y);
  socket.emit('move', Player);
};