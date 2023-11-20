const highScoresEl = document.querySelector('a');
const introEl = document.getElementById('intro');
const questionEl = document.getElementById('question');
const ulEl = document.getElementById('options');
const startButt = document.getElementById('start');
const timerEl = document.getElementById('timeLeft');

var i=0;

let timeLeft;
let questions = [
    'Commonly used data types do NOT include:',
    'The condition of an if/else statement is enclosed in:',
    'Arrays in JavaScript can be used to store:',
    'String values must be enclosed within ________ when being assigned to variables',
    'Which keyword is NOT used to declare a variable:'
];
let allAnswers = [
    ['1. numbers', '2. strings', '3. alerts', '4. booleans'],
    ['1. curly brackets', '2. parenthesis', '3. square brackets', '4. quotes'],
    ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
    ['1. square brackets', '2. curly brackets', '3. parenthesis', '4. quotes'],
    ['1. declare', '2. var', '3. let', '4. const']
];
// let ansLi = [];

// let question2 = 'The condition of an if/else statement is enclosed in:';
// let answers2 = ['1. curly brackets', '2. parenthesis', '3. square brackets', '4. quotes'];
// let question3 = 'Arrays in JavaScript can be used to store:'
// let answers3 = ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'];
// let question4 = 'String values must be enclosed within ________ when being assigned to variables';
// let answers4 = ['1. square brackets', '2. curly brackets', '3. parenthesis', '4. quotes'];
// let question5 = 'Which keyword is NOT used to declare a variable:'
// let answers5 = ['1. declare', '2. var', '3. let', '4. const'];

function startQuiz() {
    timeLeft = 60;
    introEl.remove();
    timer();
    quiz();
}

function timer() {
    setInterval(function() {
        timerEl.textContent = timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timerEl.textContent = 0;
            gameOver();
        }
    },1000);
}

function quiz() {
    questionEl.textContent = questions[i];
    let answers = allAnswers[i];
    for (var j=0; j < answers.length; j++) {
        let ansLi = document.createElement("li");
        
        li1.textContent = answers[j]
    }
}

function gameOver() {

}

startButt.addEventListener("click",startQuiz);

