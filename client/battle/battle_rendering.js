import {getObject} from "./battle_logic.js";
import {enemyArray,player} from "./battle.js";

function renderEnemy(len){
    // add id to enemy
    const enEl = enemyElements();
    enEl.id = `en${len}`;
    // render enemy dmg stat
    enEl.querySelector(".dmgstat").textContent = enemyArray[len].attack;
    // add to body
    if(len>2){enEl.classList.add("hide")}
    document.body.appendChild(enEl);
    //render enemy hp value
    renderHPStat(enemyArray[len]);
}

function enemyElements(){
    const contDiv = document.createElement("div");
    contDiv.className = "char enemy";

    const enemySpan = document.createElement("span");
    // enemySpan.textContent = "Enemy";

    const hp = document.createElement("div");
    hp.className = "healthbar";
    const hpSpan = document.createElement("span");
    hpSpan.textContent = "0";

    hp.appendChild(hpSpan);

    const dmg = document.createElement("div");
    dmg.className = "dmgstat";
    dmg.textContent = "0";

    contDiv.appendChild(enemySpan);
    contDiv.appendChild(hp);
    contDiv.appendChild(dmg);

    return contDiv;
}

function renderHPStat(object){
    let id = getObject(object);
    //target obj

    const hpTextEl = document.getElementById(id).querySelector(".healthbar").querySelector("span");
    //target psuedo element that holds value
    hpTextEl.textContent = object.currHP;    
}

function renderPlayerAttack(){
    const dmgEl = document.querySelector(".player").querySelector(".dmgstat");
    dmgEl.textContent = player.attack;
}

function renderHP(object){
    renderHPStat(object)
    let obj = getObject(object);

    const healthbar = document.getElementById(obj).querySelector(".healthbar");
    const hbWidth = Number(window.getComputedStyle(healthbar).width.substring(0,window.getComputedStyle(healthbar).width.length-2));
    // hp lost in relation to healthbar width
    let lostHP = ((object.maxHP-object.currHP)/object.maxHP)*hbWidth;
    // styling health lost
    healthbar.style = `box-shadow: inset ${-lostHP}px 0 0 0 black,0px -5px 0 0 rgb(192, 0, 0) inset`;
}

function destroyEnemyElement(){
    const frontArray = enemyArray[0].id;
    document.querySelector(`#${frontArray}`).remove();
}

function runTypeAnimation(text){
    //grey out ATTACK button
    const atkBtn = document.getElementById("attack-btn")
    atkBtn.style.cursor = "not-allowed";
    atkBtn.style.filter = "brightness(0.6)";

    const textbox = document.querySelector(".fight-container").children[0];
    const stepVariable = document.documentElement;
    stepVariable.style.setProperty("--letter-steps",text.length);

    textbox.style.display = "inline-block";
    textbox.textContent = text;
    textbox.classList.add("typeW");
    textbox.addEventListener("animationend", () => {
        textbox.classList.remove("typeW");

        atkBtn.style.cursor = "pointer";
        atkBtn.style.filter = "brightness(1)";
    },5000);
}

// background animation shake
function runShakeAnimation(){
    const bg = document.getElementById("background");
    bg.classList.add("shake");
    bg.addEventListener("animationend",() => {
        bg.classList.remove("shake");
    })
}

function runHitAnimation(object){
    const victimEl = document.getElementById(object.id);
    victimEl.classList.add("hurt");
    victimEl.addEventListener("animationend",()=>{
        victimEl.classList.remove("hurt");
    })
}

function runDeathAnimation(object){
    const victimEl = document.getElementById(object.id);
    victimEl.classList.add("dead");
    for(let i=0;i<victimEl.children.length;i++){
        victimEl.children[i].style.display = "none";
    }
    victimEl.addEventListener("animationend", ()=>{
        victimEl.classList.remove("dead");
        victimEl.style.display = "none";
    })
}

function runEndFadeAnimation(next_page_dir){
    const fadeEl = document.getElementById("transition-element");
    fadeEl.style.display = "inline-block";
    fadeEl.classList.add("changing-frame");
    fadeEl.addEventListener("animationend", ()=>{
        location.href = next_page_dir;
        fadeEl.classList.remove("changing-frame");
        fadeEl.style.display = "none";
    })
}

function renderScore(){
    const scoreLabel = document.getElementById("score");
    scoreLabel.textContent = Number(sessionStorage.getItem("score"));
}

export {renderEnemy,
    renderHPStat,
    renderPlayerAttack,
    renderHP,
    destroyEnemyElement,
    runTypeAnimation,
    runShakeAnimation,
    runDeathAnimation,
    runHitAnimation,
    runEndFadeAnimation,
    renderScore};