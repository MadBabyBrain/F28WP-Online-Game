function submit() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    var user = {
        email: email.value,
        password: password.value
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