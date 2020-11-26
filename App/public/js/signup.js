function signup() {
    const email = document.getElementById("s-email").value;
    const password = document.getElementById("s-password").value;
    const username = document.getElementById("username").value;

    var user = {
        username: username,
        email: email,
        password: password
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readState == 4 && this.status == 200) {
            console.log("Sent a signup request");
            console.log(this.responseText);
        }
    };

    xhttp.open("POST", "/users/signup", true);
    xhttp.setRequestHeader("Content-type", "application/JSON");
    xhttp.send(JSON.stringify(user));

    xhttp.onreadystatechange();
}

async function getToken(email, password) {
    const response = await fetch("http://localhost:3000/users/login", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            email: email,
            password: password
        }) // body data type must match "Content-Type" header
    });

    return await response.json();
}

async function login() {
    const email = document.getElementById("l-email").value;
    const password = document.getElementById("l-password").value;

    getToken(email, password)
        .then(token => {
            localStorage.setItem('token', token.token);
            localStorage.setItem('username', token.username);
            gotoGame();
        });
}



function gotoGame() {

    window.location.href = '../html/lobbyroom.html';

}