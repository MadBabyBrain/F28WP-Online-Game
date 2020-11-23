const characters = [];
characters.push('character_facing_down');
characters.push('character_facing_left');
characters.push('character_facing_up');
characters.push('character_facing_right');

let index = 0;
function previous() {
    const charDisplay = document.getElementById("character-select");
    // previous index of array
    if (index == 0) {
        index = (characters.length - 1);
    } else {
        --index;
    }
    // charDisplay.setAttribute("src", `../images/${characters[index]}.png`);
    charDisplay.setAttribute("src", `../images/${characters[index]}.png`);
}

function next() {
    const charDisplay = document.getElementById("character-select");
    // next index of array
    if (index == (characters.length - 1)) {
        index = 0;
    } else {
        ++index;
    }
    //charDisplay.setAttribute("src", "../images/"+characters[index]+".png");
    charDisplay.setAttribute("src", `../images/${characters[index]}.png`);
}

function createPlayer() {
    const player = document.createElement('IMG');
    player.setAttribute("class", "player");
    player.setAttribute("id", socket.id);
    player.src = `../images/${characters[index]}.png`;
    document.body.insertBefore(player, document.getElementById("buttons"));

    let x = Math.floor(Math.random() * 600 + 100);
    let y = Math.floor(Math.random() * 400 + 100);

    //set initialise player
    player.style.left = x + "px";
    player.style.top = + y + "px";

    a = characters[index];
    Player["id"] = socket.id;
    Player["sprite"] = '../images/' + a;
    Player["x"] = x;
    Player["y"] = y;
    Player["ref"] = document.getElementById(socket.id);

    socket.emit('create_player', Player);
}

function select() {
    createPlayer();
    // console.log(socket.id);

    const charSelector = document.getElementById("character-select-box");
    charSelector.style.display = "none";
}