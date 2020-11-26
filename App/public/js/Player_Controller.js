const socket = io();
let doc = null;

const Player = {
  id: "",
  x: 0,
  y: 0,
  sprite: "",
  ref: null,
  room: null
};

const interact_coords = {
  rock: {},
  paper: {},
  scissors: {}
};

socket.on('start_game', (game) => {
  // console.log("game starting")
  unloadPlayers(game);
  document.getElementById('lobby-main').remove();

  fetch('http://localhost:3000/gameroom').then(res => {
    // console.log("html found");
    res.text().then(data => {
      // console.log(data);
      doc = (new DOMParser()).parseFromString(data, "text/html");
      // console.log(doc.body.innerHTML);
      // document.getElementsByTagName("body")[0].innerHTML += doc.body.innerHTML; // using this prevents the client from moving their characters
      let body = document.querySelector("body");
      body.insertAdjacentHTML("afterbegin", doc.body.innerHTML);
      // call external script(s)
      starttimer(socket);
    });
  })
  setsize();
});


socket.on('new_round', () => {
  starttimer(socket);
});


socket.on('player_disconnect', () => {
  alert("You have lost the round");
  document.location.reload(true);
})

socket.on('win', () => {
  alert("You have won the tournament");

  // mutliple checks to see if the browser has a token stored locally
  if (localStorage.getItem('token') && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
    socket.emit('increase_point', localStorage.getItem('token'));
  }

  document.location.reload(true);
})

window.addEventListener("onbeforeunload", function () {
  socket.emit('disconnect', Player)
  socket.disconnect();
});

socket.on('join_room', room => {
  beginsize();
  Player["room"] = room;
  socket.emit('update_state', socket.id, Player);
});

socket.on('remove_player', id => {
  if (document.getElementById(p)) {
    document.getElementById(id).remove();
  }
});

socket.on('load_players', gs => {
  for (p in gs) {
    if (!document.getElementById(p)) {
      const player = document.createElement('IMG');
      player.setAttribute("class", "player");
      player.setAttribute("id", p);
      player.src = `../images/${gs[p].sprite}.png`;
      document.body.insertBefore(player, document.getElementById("lobby-main"));

      //set initialise player
      player.style.left = gs[p].x + "px";
      player.style.top = gs[p].y + "px";
    }
  }
});

socket.on('update_players', (id, pos) => {
  let player = document.getElementById(id);
  player.style.left = pos.x + "px";
  player.style.top = pos.y + "px";
});

// var image = document.createElement("IMG")
// image.src = image
// player.appendChild(image)

socket.on('load_player', (id, gs) => {
  const player = document.createElement('IMG');
  player.src = `../images/${gs[id].sprite}.png`;
  player.setAttribute("class", "player");
  player.setAttribute("id", id);
  document.body.insertBefore(player, document.getElementById("buttons"));

  //set initialise player
  player.style.left = gs[id].x + "px";
  player.style.top = gs[id].y + "px";
});

var maxwidth = 0;
var maxheight = 0;
var movementSpeed = 0;
var pressedKeys = {};

function beginsize() {
  maxwidth = document.getElementById("game_div").getBoundingClientRect()["width"] - 30;
  maxheight = document.getElementById("game_div").getBoundingClientRect()["height"] - 50;
  movementSpeed = 5;
}

function setsize() {
  maxwidth = 670;
  maxheight = 650;
}

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

  if (document.getElementById("rock")) {
    checkCollision(Player);
  }
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
  // console.log(key);
  if (document.getElementById(Player.id)) {
    switch (key) {
      case 65:
        Player.x = parseInt(Player.ref.style.left, 10) - movementSpeed
        if (Player.x < 8) {
          Player.ref.style.left = 8 + "px";
        }
        else {
          Player.ref.style.left = Player.x + "px"
        }

        break
      case 68:
        Player.x = parseInt(Player.ref.style.left, 10) + movementSpeed

        if (Player.x > maxwidth) {
          Player.ref.style.left = maxwidth + "px";
        }
        else {
          Player.ref.style.left = Player.x + "px"
        }

        break
      case 87:
        Player.y = parseInt(Player.ref.style.top, 10) - movementSpeed

        if (Player.y < 8) {
          Player.ref.style.top = 8 + "px";
        }
        else {
          Player.ref.style.top = Player.y + "px"
        }

        break
      case 83:
        Player.y = parseInt(Player.ref.style.top, 10) + movementSpeed

        if (Player.y > maxheight) {
          Player.ref.style.top = maxheight + "px";
        }
        else {
          Player.ref.style.top = Player.y + "px"
        }
        Player.sprite = "../images/Character_facing_down";
        break
    }
  }

  socket.emit('move', Player);
};




function unloadPlayers(game) {
  for (p in game) {
    if (p !== Player.id) {
      if (document.getElementById(p)) {
        let player = document.getElementById(p);
        player.remove();
      }
    }
  }
}