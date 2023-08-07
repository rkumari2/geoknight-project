import { updateLoop, resetLoop,increaseDifficulty,addToScore,updateStat} from "../player.js";

let selectedAnswer = null;
let questionData = null; 

function displayMediumQuestion () {
    const displayedquestion = document.querySelector('h3')
    const option1 = document.querySelector('#option1')
    const option2 = document.querySelector('#option2')
    const option3 = document.querySelector('#option3')
    const option4 = document.querySelector('#option4')
    fetch ('https://geoknightbackend.onrender.com/levels/medium/random')
    .then (resp => resp.json())
    .then (data => {
        questionData = data;
        displayedquestion.textContent = questionData.question
        option1.textContent = questionData.choice1
        option2.textContent = questionData.choice2
        option3.textContent = questionData.choice3
        option4.textContent = questionData.choice4

        option1.addEventListener("click", () => selectedAnswer = "choice1")
        option2.addEventListener("click", () => selectedAnswer = "choice2")
        option3.addEventListener("click", () => selectedAnswer = "choice3")
        option4.addEventListener("click", () => selectedAnswer = "choice4")
    })
    .catch (err => {
        console.log(err)
    })
}

function checkAnswer(correctAnswer, selectedAnswer) {
    return correctAnswer === selectedAnswer;
}

const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (selectedAnswer) {
        updateLoop();
        if (questionData) {
            let correctAnswer = questionData.correctChoice;
            let isCorrect = checkAnswer(correctAnswer, selectedAnswer); 
            if (isCorrect) {
                addToScore()
                updateStat("maxHP",4);
                updateStat("currHP",4);
                window.alert('Correct!');
            } else {
                window.alert('Wrong answer!');
            }

            if(sessionStorage.getItem("loop") == 3){
                resetLoop();
                increaseDifficulty();
                window.location.href = "../battle/index.html";
            }else{
                window.location.href = "../choice_page/categories.html";
            }

        } else {
            console.log('Question data not available.');
        }
    } else {
        window.alert('Please select an answer before submitting.');
    }
    
});

displayMediumQuestion();