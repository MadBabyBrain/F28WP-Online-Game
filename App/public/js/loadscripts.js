function loadscripts() {
    const scripts = ["collision_detection", "timer"];

    for (s in script) {
        let script = document.createElement("script");
        console.log("../js/" + s + ".js")
        script.setAttribute("src", "../js/" + s + ".js");
        document.body.appendChild(script);
    }
}