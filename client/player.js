function createPlayerInStorage(){
    sessionStorage.setItem("maxHP",30);
    sessionStorage.setItem("currHP",30);
    sessionStorage.setItem("attack",5);
    sessionStorage.setItem("difficulty",0);
    sessionStorage.setItem("loop",0);
    sessionStorage.setItem("score",0);
}

function showSessionStorage(){
    console.log(sessionStorage.getItem("maxHP"))
    console.log(sessionStorage.getItem("currHP"))
    console.log(sessionStorage.getItem("attack"))
    console.log(sessionStorage.getItem("difficulty"))
    console.log(sessionStorage.getItem("loop"))
    console.log(sessionStorage.getItem("score"))
}

function updateLoop(){
    let loop = sessionStorage.getItem("loop")
    sessionStorage.setItem("loop",Number(loop)+1)
}

function resetLoop(){
    sessionStorage.setItem("loop",0)
}

function increaseDifficulty(){
    const initial = Number(sessionStorage.getItem("difficulty"));
    sessionStorage.setItem("difficulty",initial+1)
}

function addToScore(){
    let playerScore = Number(sessionStorage.getItem("score"))+100;
    console.log(playerScore)
    sessionStorage.setItem("score",playerScore);
}

function updateStat(stat,increment){
    let playerStat = Number(sessionStorage.getItem(stat))+increment;
    if(stat === "currHP"){
        if(Number(sessionStorage.getItem("maxHP")) < playerStat){
            playerStat = sessionStorage.getItem("maxHP");
        }
    }else if(stat === "maxHP"){
        //increasing maxhp
        playerStat = Number(sessionStorage.getItem(stat))+increment;
        //increasing currhp
        sessionStorage.setItem("currHP",Number(sessionStorage.getItem("currHP"))+4)
    }

    sessionStorage.setItem(stat,playerStat);
}

function resolvePlayerStat(stat,value){
    sessionStorage.setItem(stat,value)
}

export {resolvePlayerStat,createPlayerInStorage,updateLoop,showSessionStorage,resetLoop,increaseDifficulty,addToScore,updateStat};