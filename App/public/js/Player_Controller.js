var player = document.getElementById("player");
var positionX = 800
var positionY = 400
const movementSpeed = 10
var pressedKeys = {}

//set initial player position
player.style.left = positionX + "px"
player.style.top = positionY + "px"


/*
If a key is pressed then set the index corrosponding with the keycode that
has been pressed to true. If the key is no longer being pressed then set the
corrosponding index with the keycode that is no longer being pressed to false
*/
document.addEventListener('keydown', event=>{
  pressedKeys[event.keyCode] = true
})

document.addEventListener('keyup', event=>{
  pressedKeys[event.keyCode] = false
})



/*
Check if any valid keys have been pressed and move the player accordingly
Call this function every 33ms so that the game runs at 30fps
*/
setInterval(function runController(){
  var keys = [65,68,87,83]
  for(i=0;i<keys.length;i++){
    if(pressedKeys[keys[i]]){
      movePlayer(keys[i]);
    }
  }
},33)

/*
Move the player according to what key as been pressed.
Convert the current x or y position to in integer then add/subtract 1 multiplyed by
the movement speed. Convert this back to px and set the new x or y position.
*/
function movePlayer(key){
  switch(key){
    case 65:
      positionX = parseInt(player.style.left,10)  - movementSpeed
      player.style.left = positionX + "px"
      break
    case 68:
      positionX = parseInt(player.style.left,10) +  movementSpeed
      player.style.left = positionX + "px"
      break
    case 87:
      positionY = parseInt(player.style.top,10)  - movementSpeed
      player.style.top = positionY + "px"
      break
    case 83:
      positionY = parseInt(player.style.top,10) +  movementSpeed
      player.style.top = positionY + "px"
      break
  }
}
