function displayScore() {
    fetch("https://geoknightbackend.onrender.com/scoreboard/current-player")
        .then(resp => resp.json())
        .then(data => {
            console.log("doing")
            const scoreboard = data
            const usernameElement = document.querySelector('#current-player')
            const scoreElement = document.querySelector('#score')

            usernameElement.textContent = scoreboard["name"]
            scoreElement.textContent = Number(sessionStorage.getItem("score"));
        })
}

async function createUsername(e) {
    e.preventDefault()
    
    const data = {name: e.target.username.value}
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch("https://geoknightbackend.onrender.com/scoreboard/current-player", options)

    
    if (response.status == 201) {
        e.target.username.value = ''
        alert("username created")
        location.reload()
    }

}

document.getElementById("homepage").addEventListener("click", () => {
    window.location.href = "../index.html";
})

const form = document.querySelector("#create-username");
form.addEventListener("submit", createUsername);

const h3 = document.getElementById("scoreID");

h3.textContent = sessionStorage.getItem("score");

displayScore()