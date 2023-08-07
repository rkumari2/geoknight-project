import { createPlayerInStorage } from "./player.js";

document.getElementById("start").addEventListener("click",() => {
    createPlayerInStorage();
    location.href = "./choice_page/categories.html";
})

document.getElementById("scoreboard").addEventListener("click",()=>{
    location.href = "./scoreboard/index.html";
})