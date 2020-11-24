const interactables = document.getElementsByClassName("interactables");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

const button_width = 100;
const button_height = 100;

const rock_pos = rock.getBoundingClientRect();
const paper_pos = paper.getBoundingClientRect();
const scissors_pos = scissors.getBoundingClientRect();

if (event.clientX > (rock_pos - button_width) && event.clientX < (rock_pos + button_width)
    && event.clientY > (rock_pos - button_height) && event.clientY > (rock_pos - button_height)) {
    rock.classList.add("collision-box-hit");
}