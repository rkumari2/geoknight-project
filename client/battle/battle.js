import {createEnemy,
    getRandomInt,resolveAttack,
    updateEnemyID,
    checkZeroHP} from "./battle_logic.js";

import {renderHPStat,
    renderPlayerAttack,
    renderHP,
    destroyEnemyElement,
    runTypeAnimation,
    runShakeAnimation,
    runDeathAnimation,
    runEndFadeAnimation,
    renderScore} from "./battle_rendering.js";

import {addToScore, resolvePlayerStat} from "../player.js";

// Initialize difficulty scalers
let battleCounter = Number(sessionStorage.getItem("difficulty"));
let enemyCount = 1;

// Initialize score
let score = 0;

// Initialize player object
const playerElement = document.getElementById("player");
const player = {
    maxHP: sessionStorage.getItem("maxHP"),
    currHP: sessionStorage.getItem("currHP"),
    attack: sessionStorage.getItem("attack"),
    name: "player",
    
    displayStats() {
      console.log(`Player - Max HP: ${this.maxHP}, Current HP: ${this.currHP}, Attack: ${this.attack}`);
    }
};

// Create empty array to store enemies
let enemyArray = [];

var enemyAttackMidpoint = 5;
var enemyMaxHPMidpoint = 10;

// Class constructor for enemy objects
class Enemy {
    constructor(maxHP, attack, id) {
      this.maxHP = maxHP;
      this.currHP = maxHP;
      this.attack = attack;
      this.name = "enemy";
      this.id = `en${id}`;
    }

    displayStats() {
        console.log(
          `${this.name} - Health: ${this.health}, Attack: ${this.attack}`
        );
    }
}

export {Enemy,enemyArray,playerElement,player};



function adjustDifficulty() {
    enemyCount = 1 + Math.floor(battleCounter * 0.5);
    enemyMaxHPMidpoint = 4 + Math.floor(battleCounter * 1.2);
    enemyAttackMidpoint = 2 + Math.floor(battleCounter * 1.1);
}

function initBattlePhase() {
    renderPlayerAttack();
    renderHPStat(player)
    adjustDifficulty();
    battleCounter += 1;
    // Create enemies dynamically based on difficulty
    for (let i = 0; i < enemyCount; i++) {
        createEnemy(getRandomInt(enemyMaxHPMidpoint,2), getRandomInt(enemyAttackMidpoint,2))
    }
}


    // Event listener for the attack button
document.getElementById("attack-btn").addEventListener("click", () => {
    // If attack button is pressed, do the following
    resolveAttack(player,enemyArray[0]);

    // Renders change in HP
    renderHP(enemyArray[0]);
    renderHP(player);

    if (checkZeroHP(player)) {
        runDeathAnimation(playerElement)
        setTimeout(function() {runTypeAnimation("GeoKnight has, uh, fainted! Indefinitely!")},1200);
        setTimeout(function() {runEndFadeAnimation("../final_score_page/index.html")},4000);

    } else if (checkZeroHP(enemyArray[0])) {
        // Remove enemy object from the enemyArray
        destroyEnemyElement();
        runShakeAnimation();
        addToScore();
        renderScore();
        enemyArray.shift();
        setTimeout(function() {runTypeAnimation("GeoKnight defeated an enemy!")},1200);
        updateEnemyID();
    }
        // If there are no more enemies
    if (enemyArray.length <= 0) {
        addToScore();
        resolvePlayerStat("currHP",sessionStorage.getItem("currHP"))
        setTimeout(function() {runTypeAnimation("GeoKnight has defeated the enemies!")},1200);
        setTimeout(function() {runEndFadeAnimation("../choice_page/categories.html")},4000);
    }
    
});
// }

addEventListener("load",(event) => {
    const transitionElement = document.getElementById("transition-element");
    transitionElement.addEventListener("animationend",() => {
        transitionElement.classList.remove("hidden");
        transitionElement.style.display = "none";
    })
    renderScore();
    renderHP(player);
})

initBattlePhase();
// runBattlePhase()