const highScoresEl = document.querySelector('a');
const introEl = document.getElementById('intro');
const questionEl = document.getElementById('question');
const possAns = document.getElementById('options');
const startButt = document.getElementById('start');
const timerEl = document.getElementById('timeLeft');

var i = 0;

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
let correctAns = ['3. alerts', '2. parenthesis', '4. all of the above', '4. quotes', '1. declare'];

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
    let timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timerEl.textContent = 0;
            gameOver();
        }
    }, 1000);
}

// delay function from https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


// Displays Question & respective answer options
function quiz() {
    var ansButt = [];

    questionEl.textContent = questions[i];
    let answers = allAnswers[i];

    for (var j = 0; j < answers.length; j++) {
        ansButt[j] = document.createElement("button");
        possAns.append(ansButt[j]);
        ansButt[j].textContent = answers[j];
        ansButt[j].id = "ansButt" + j;
    };

    var ansButt1 = document.getElementById('ansButt0');
    var ansButt2 = document.getElementById('ansButt1');
    var ansButt3 = document.getElementById('ansButt2');
    var ansButt4 = document.getElementById('ansButt3');

    ansButt.forEach((element) =>
        element.addEventListener("click", function () {
            if (i < questions.length) {
                if (element.textContent === correctAns[i]) {
                    element.style.backgroundColor = "#70D500";
                    i++;
                    delay(500).then(() => {
                        ansButt1.remove();
                        ansButt2.remove();
                        ansButt3.remove();
                        ansButt4.remove();
                        quiz();
                    });
                } else {
                    element.style.backgroundColor = "#D90E0E";
                    timeLeft = timeLeft - 5;
                    i++;
                    delay(500).then(() => {
                        ansButt1.remove();
                        ansButt2.remove();
                        ansButt3.remove();
                        ansButt4.remove();
                        quiz();
                    });
                }
            }
            // if (i === questions.length - 1) {
            //     clearInterval(timeInterval);
            //     gameOver();
            // }
        })
    );
}

function gameOver() {
    questionEl.textContent = "Game Over";
}

startButt.addEventListener("click", startQuiz);

