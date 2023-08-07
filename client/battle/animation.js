// Assign player and enemy elements to object
const playerAnimate = document.getElementById('player'); 
// const enemyAnimate = document.getElementById('en0');

const attackButton = document.getElementById('attack-btn');

attackButton.addEventListener('click', () => {

    const enemyAnimate = document.getElementById('en0');

    playerAnimate.classList.add('attack'); // Add the 'attack' class to apply the attack animation
    playerAnimate.addEventListener('animationend', onAnimationEnd, { once: true });

    
    enemyAnimate.classList.add('attack');
    enemyAnimate.addEventListener('animationend', onAnimationEnd, { once: true });
});

function onAnimationEnd() {

    enemyAnimate = document.getElementById('en0');

    playerAnimate.classList.remove('attack'); // Remove the 'attack' class to go back to the idle animation
    enemyAnimate.classList.remove('attack');
}

