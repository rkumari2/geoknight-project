const maxHP = document.querySelector("#maxhp-disp");
const currHP = document.querySelector("#currhp-disp");
const attack = document.querySelector("#atk-disp");

maxHP.textContent = sessionStorage.getItem("maxHP")
currHP.textContent = sessionStorage.getItem("currHP")
attack.textContent = sessionStorage.getItem("attack")