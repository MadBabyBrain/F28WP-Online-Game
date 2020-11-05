var playerMove = ""
var opponentMove = ""


document.getElementById("rockPlaceholder").addEventListener('onclick',event=>{
  playerMove = "rock"
  play()
})

document.getElementById("paperPlaceholder").addEventListener('onclick',event=>{
  playerMove = "paper"
  play()
})

document.getElementById("scissorsPlaceholder").addEventListener('onclick',event=>{
  playerMove = "scissors"
  play()
})



function play(){
  if(playerMove === opponentMove){
    draw()
  }

  switch(playerMove){
    case "rock":
      if(opponentMove === "paper"){
        lose()
      }else{
        win()
      }
      break

    case "paper":
      if(opponentMove === "scissors"){
        lose()
      }else{
        win()
      }
      break

    case "scissors":
      if(opponentMove === "rock"){
        lose()
      }else{
        win()
      }
      break
  }
}

function draw(){

}

function win(){

}

function lose(){

}
