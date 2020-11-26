async function getScores() {
    const response = await fetch("http://localhost:3000/users/score", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    return await response.json();
}

window.addEventListener('load', () => {
    const table = document.getElementById("scoreboard");
    console.log(table);

    getScores()
        .then(scores => {
            console.log(scores);
            for (user in scores["users"]) {
                const row = document.createElement("tr");
                const fragment = document.createDocumentFragment()
                for (score in scores["scores"]) {
                    if (scores["users"][user]._id === scores["scores"][score]._id) {
                        const name_d = document.createElement("td")
                        name_d.textContent = scores["users"][user].username
                        const score_d = document.createElement("td")
                        score_d.textContent = scores["scores"][score].score
                        fragment.appendChild(name_d);
                        fragment.appendChild(score_d);
                        row.appendChild(fragment);
                        table.appendChild(row);
                    }
                }
            }
        });
})