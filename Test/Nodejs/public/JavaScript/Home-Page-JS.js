/* function startGame()
{

    gameArea.start();

}


var gameArea = {
    
    canvas : document.createElement("canvas"),
    
    start : function() {

        this.canvas.width = 480;
        this.canvas.heigt = 207;
        this.context  =this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    }
} */

// ----------------------------------------------------------------Added by Jakub
// Get JSON Object from NodeJS Server and populate table

const dataTable = document.getElementById("data");
var socket = io();

socket.on('update table', (table) => {
    updateTable(table);
});

// Example POST method implementation:
async function fetchWrapper(url = '', method = 'GET', data = {}) {
    // Default options are marked with *

    const options = { 
      method,
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }

    if (method != 'GET') {
        options.method = method
    }

    if (Object.keys(data).length !== 0) {
        options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options);

    return response.json(); // parses JSON response into native JavaScript objects
  }

function genTable() {
    const res = fetchWrapper('api/scores')
    res.then(jdata => {
        updateTable(jdata)
    })
}
function updateTable(jdata) {

    var tbodyRowCount = dataTable.tBodies[0].rows.length - 1;
    for(i = 0; i < tbodyRowCount; i++) {
        dataTable.deleteRow(-1);
    }

    for(i = 0; i < jdata.length; i++) {
        var row = dataTable.insertRow();
        var name = row.insertCell(0);
        var score = row.insertCell(1);
        name.innerHTML = `${jdata[i].name}`;
        score.innerHTML = `${jdata[i].score}`;
    }
}

function sendData() {
    const name = document.getElementById("name-input");
    const score = document.getElementById("score-input");

    if(name.value.length < 3) return alert("name field must be more than 3 characters");
    if(score.value.length < 1) return alert("score field cannot be empty");
    if(isNaN(score.value)) return alert("score field must be a number");

    const j = {"name": name.value, "score": score.value};

    fetchWrapper('api/scores', 'POST', j)
        .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });

    name.value = "";
    score.value = "";
    
    genTable();
}

function toggleTable()
{
    var x = document.getElementById("data")

    if (x.style.display === "none")
    {
        x.style.display = "block";
    }
    else
    {
        x.style.display = "none";
    }

    genTable();
}
//=======================================================================================================