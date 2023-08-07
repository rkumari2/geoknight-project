import {renderEnemy,runHitAnimation,runTypeAnimation} from "./battle_rendering.js";
import {Enemy,enemyArray,playerElement} from "./battle.js";
import { resolvePlayerStat } from "../player.js";

function createEnemy(maxHP, attack) {
    let len = enemyArray.length;

    const newEnemy = new Enemy(maxHP, attack, len);
    enemyArray.push(newEnemy);
    renderEnemy(len);
    // return newEnemy; // Optional return, might need later
}

// Increase number of enemies and enemy stats based on battleCounter 

function getRandomInt(midpoint,range) {
    const min = midpoint - range;
    const max = midpoint + range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resolveAttack(player, enemy) {
    player.currHP -= enemy.attack
    let playerATK = Number(player.attack) + (getRandomInt(1,1))
    enemy.currHP -= playerATK
    resolvePlayerStat("currHP",player.currHP)
    runHitAnimation(playerElement)
    runHitAnimation(document.getElementById("en0"))
    runTypeAnimation(`GeoKnight dealt ${playerATK} damage to the enemy.`);
    setTimeout(function() {runTypeAnimation(`Enemy dealt ${enemyArray[0].attack} damage to the GeoKnight.`)},1200);
}

function checkZeroHP(object) {
    return object.currHP <= 0;
}

function getObject(object){
    if(String(object.id).includes("en")){
        return object.id;
    }else if(object.name === "player"){
        return "player";
    }
}

function updateEnemyID(){
    for(let i=0;i<enemyArray.length;i++){
        const enemyEl = document.getElementById(`en${i+1}`);
        // HTML element
        enemyEl.id = `en${i}`;
        if(i<=2){enemyEl.classList.remove("hide")}
        //JS element
        enemyArray[i].id = `en${i}`;
    }
}



export {createEnemy,getRandomInt,resolveAttack,getObject,updateEnemyID,checkZeroHP};