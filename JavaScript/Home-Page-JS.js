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
document.getElementById("tableUpdateButton").style.display = "none";

const dataTable = document.getElementById("data");
const myUrl = window.location.href;


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        var status = xhr.status;
    
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};

function genTable() {
    getJSON(`${myUrl}api/scores`,  (err, jdata) => {
        if (err != null) {
            console.error(err);
        } else {
            //console.log(jdata);
    
            for(i = 0; i < jdata.length; i++) {
                var row = dataTable.insertRow();
                var name = row.insertCell(0);
                var score = row.insertCell(1);
                name.innerHTML = `${jdata[i].name}`;
                score.innerHTML = `${jdata[i].score}`;
            }

            document.getElementById("tableGenButton").remove();
            document.getElementById("tableUpdateButton").style.display = "block";
        }
    });
}

function updateTable() {
    getJSON(`${myUrl}api/scores`,  (err, jdata) => {
        if (err != null) {
            console.error(err);
        } else {
            //console.log(jdata);
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
    });
}

function sendData() {
    //console.log(document.getElementById("dataForm"));
    const children = document.getElementById("dataForm").children;
    const name = children[1].value;

    if(name.length < 3) return alert("name field must be more than 3 characters");
    if(children[4].value.length < 1) return alert("score field cannot be empty");
    if(isNaN(children[4].value)) return alert("score field must be a number");

    const score = parseInt(children[4].value);

    //console.log(name);
    //console.log(score);
    const j = {"name": name, "score":score};

    var xhr = new XMLHttpRequest();
        xhr.open('POST', `${myUrl}api/scores`, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(j));

    children[1].value = "";
    children[4].value = "";
}

//console.log(document.getElementById("dataForm").children[1].value);
//=======================================================================================================