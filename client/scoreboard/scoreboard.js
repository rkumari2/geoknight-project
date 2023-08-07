const scoreboard = document.querySelector('#scoreboard')
const subBtn = document.getElementById("homepage");

const addScore = (data) => {
    const li = document.createElement('li')
    li.textContent = data.name + ": " + data.score
    li.style.textTransform = "capitalize"
    scoreboard.appendChild(li)
}

function displayScoreboard() {
    fetch("https://geoknightbackend.onrender.com/scoreboard")
        .then(resp => resp.json())
        .then(data => {
            data.forEach(score => {
                addScore(score)
            });
    })
}

subBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
})

displayScoreboard()