 import { createPlayerInStorage } from "../player.js";

 const subBtn = document.getElementById("submit");
 const h3 = document.getElementById("scoreID");

 h3.textContent = sessionStorage.getItem("score");

 subBtn.addEventListener("click", () => {
     createPlayerInStorage()
     window.location.href = "../index.html";
 })