const interactables = document.getElementsByClassName("interactables");
let currently_touching = null;

function setobj() {
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");
    //call timer
    //once timer finish socket.emit('choice', {currently_touching, socket.id})
}

async function checkCollision(Player) {
    buttonCollision(rock, Player);
    buttonCollision(paper, Player);
    buttonCollision(scissors, Player);
}


async function buttonCollision(elem, Player) {
    // console.log(elem)
    // console.log(Player)
    let elem_pos = elem.getBoundingClientRect();

    if ((Player.x + 30) >= (elem_pos["right"] - elem_pos["width"]) && Player.x <= elem_pos["right"]
        && (Player.y + 50) >= (elem_pos["bottom"] - elem_pos["height"]) && Player.y <= elem_pos["bottom"]) {
        elem.classList.add("collision-box-hit");
        //console.log(elem + "'s collision box was triggered");

        currently_touching = elem.id;
        console.log(currently_touching);

        // create new event -- don't need to use
        let event = new CustomEvent('collisionTrigger');
        elem.dispatchEvent(event);

    } else {
        if (elem.classList.contains("collision-box-hit")) {
            elem.classList.remove("collision-box-hit");
        }
    }
}

// // collision trigger event listeners
// rock.addEventListener('collisionTrigger', () => {
//     console.log("event triggered");
//     // send rock option data to server
// });

// paper.addEventListener('collisionTrigger', () => {
//     console.log("event triggered");
//     // send paper option data to server
// });

// scissors.addEventListener('collisionTrigger', () => {
//     console.log("event triggered");
//     // send scissors option data to server
// });