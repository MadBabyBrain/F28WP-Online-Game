let playerObj = {
  positionX: Math.floor(Math.random() * 600 + 100),
  positionY: Math.floor(Math.random() * 400 + 100),
  image: "../images/character_facing_down.png"
}


// var image = document.createElement("IMG")
// image.src = image
// player.appendChild(image)



const player = document.createElement('IMG')
player.setAttribute("id", "player")
document.body.insertBefore(player, document.getElementById("buttons"));

//set initialise player
player.style.left = playerObj.positionX + "px";
player.style.top = playerObj.positionY + "px";



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
      playerObj.positionX = parseInt(player.style.left, 10) - movementSpeed
      player.style.left = playerObj.positionX + "px"
      break
    case 68:
      playerObj.positionX = parseInt(player.style.left, 10) + movementSpeed
      player.style.left = playerObj.positionX + "px"
      break
    case 87:
      playerObj.positionY = parseInt(player.style.top, 10) - movementSpeed
      player.style.top = playerObj.positionY + "px"
      break
    case 83:
      playerObj.positionY = parseInt(player.style.top, 10) + movementSpeed
      player.style.top = playerObj.positionY + "px"
      break
  }
  console.log(playerObj.positionX, playerObj.positionY);
  updateposition(playerObj);
};


function displayPlayers() {

};
