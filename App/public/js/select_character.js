const characters = [];
characters.push('Character_facing_down');
characters.push('Holy_man');
characters.push('karate_man');
characters.push('Nevin_Icon');
characters.push('Sprite-0002');
characters.push('alien');

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
    console.log(characters[index])
    const player = document.createElement('IMG');
    player.setAttribute("class", "player");
    player.setAttribute("id", socket.id);
    player.src = `../images/${characters[index]}.png`;
    document.body.insertBefore(player, document.getElementById("buttons"));

    let x = Math.floor(Math.random() * 100) * 6;
    let y = Math.floor(Math.random() * 100) * 4;

    //set initialise player
    player.style.left = x + "px";
    player.style.top = y + "px";

    a = characters[index];
    Player["id"] = socket.id;
    Player["sprite"] = '../images/' + a;
    Player["x"] = x;
    Player["y"] = y;
    Player["ref"] = document.getElementById(Player.id);

    socket.emit('create_player', Player);
}

function select() {
    createPlayer();
    // console.log(socket.id);

    const charSelector = document.getElementById("char-select-box");
    const game = document.getElementById("game_div");
    charSelector.style.display = "none";
    game.style.display = "block";
}