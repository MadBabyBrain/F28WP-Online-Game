const interactables = document.getElementsByClassName("interactables");
let currently_touching = 0;

let this_player = {};

function starttimer() {
    const p = document.getElementById("timer");
    timer(15, p, socket);
}

function timer(time, p, socket) {
    if (time === 0) {
        console.log("time is up");
        socket.emit('choice', { player: this_player, choice: currently_touching });
    }
    else {
        console.log(time);
        p.textContent = time;
        setTimeout(() => {
            timer(time - 1, p, socket);
        }, 1000);
    }
}


function setobj() {
    // this_player = player;
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");
}

async function checkCollision(player) {
    this_player = player;
    buttonCollision(rock);
    buttonCollision(paper);
    buttonCollision(scissors);
}


async function buttonCollision(elem) {
    // console.log(elem)
    // console.log(Player)

    let elem_pos = elem.getBoundingClientRect();

    if ((Player.x + 30) >= (elem_pos["right"] - elem_pos["width"]) && Player.x <= elem_pos["right"]
        && (Player.y + 50) >= (elem_pos["bottom"] - elem_pos["height"]) && Player.y <= elem_pos["bottom"]) {
        elem.classList.add("collision-box-hit");
        //console.log(elem + "'s collision box was triggered");

        switch (elem.id) {
            case 'rock':
                currently_touching = 1;
                break;
            case 'paper':
                currently_touching = 2;
                break;
            case 'scissors':
                currently_touching = 3;
                break;
        }
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