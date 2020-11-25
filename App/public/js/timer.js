function starttimer() {
    const p = document.getElementById("timer");
    timer(10, p);
}



function timer(time, p) {
    if (time === 0) {
        console.log("time is up")
    }
    else {
        console.log(time);
        p.textContent = time;
        setTimeout(() => {
            timer(time - 1, p);
        }, 1000);
    }
}