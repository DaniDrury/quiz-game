const mainEl = document.querySelector('main');
const introEl = document.getElementById('intro');
const questionEl = document.getElementById('question');
const possAns = document.getElementById('options');
const startButt = document.getElementById('start');
const timerEl = document.getElementById('timeLeft');
const quizEl = document.getElementById('quiz');
const hsButt = document.getElementById('hs');
const homeButt = document.getElementById('home');

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

// start game function - sets timer, removes landing page element, calls timer function and quiz function
function startQuiz() {
    timeLeft = 60;
    introEl.remove();
    timer();
    quiz();
}

var i = 0;

// delay function from https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
// intended to allow users to see if answer was correct or not before going onto next question
// also delays gameOver function to allow for the above before moving to Game Over
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// timer function - calls gameOver function when time runs out or all questions are answered
function timer() {
    let timeInterval = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;
        // following if statement isn't working - time continues into negatives...
        if (timeLeft <= 0) {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            delay(50).then(() => {
                gameOver()});
        }
        if (timeLeft > 0 && i === questions.length) {
            clearInterval(timeInterval);
            delay(50).then(() => {
                gameOver()});
        }
    }, 1000);
}

// Displays Question & respective answer options
function quiz() {
    let ansButt = [];

    questionEl.textContent = questions[i];
    let answers = allAnswers[i];

    if (i < questions.length) {
    for (var j = 0; j < answers.length; j++) {
        ansButt[j] = document.createElement("button");
        possAns.append(ansButt[j]);
        ansButt[j].textContent = answers[j];
        ansButt[j].id = "ansButt" + j;
    };
    }

    let ansButt1 = document.getElementById('ansButt0');
    let ansButt2 = document.getElementById('ansButt1');
    let ansButt3 = document.getElementById('ansButt2');
    let ansButt4 = document.getElementById('ansButt3');

    // event listener for answer selections
    // Correct Answers turn Green, wrong answers turn red & deduct 5 seconds from timer
    ansButt.forEach((element) =>
        element.addEventListener("click", function () {
            // prevents multiple clicks on same question / answers
            this.disabled = true;
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
        })
    );
}

let highScoresArray = [];

function gameOver() {
    // remove Quiz element
    quizEl.remove();
    // Create and append Game Over element
    let gameOverEl = document.createElement('article');
    mainEl.append(gameOverEl);
    
    let outroEl = document.createElement('h1');
    outroEl.textContent = "Game Over";
    gameOverEl.append(outroEl);
    
    let outroInstructEl = document.createElement('h2');
    outroInstructEl.textContent = "Enter your initials to save your score.";
    gameOverEl.append(outroInstructEl);
    
    // create form to submit initials and save timeLeft
    // let initForm = document.createElement('form');
    // initForm.setAttribute('id', 'initialsForm');
    // gameOverEl.append(initForm);
    
    let initInput = document.createElement('input');
    initInput.setAttribute = ('id', 'initials');
    gameOverEl.append(initInput);
    
    let submitButt = document.createElement('button');
    submitButt.setAttribute('id', 'submitBtn');
    submitButt.textContent = "Submit";
    gameOverEl.append(submitButt);

    // what I want to happen event listener
    submitButt.addEventListener("click", function(ev) {
        let highScoreObj = {
            initials: initInput.value,
            score: timeLeft.value
        }
        
        highScoresArray.push(highScoreObj);

        localStorage.setItem('highScores', JSON.stringify(highScoresArray));

        highScores();
    });
}

function highScores() {
    // remove unnecessary page elements
    introEl.remove();
    quizEl.remove();

    // set timeLeft to 0 for consistency with landing page
    timerEl.textContent = 0;
    // create & append High Scores container and sub elements
    let highScoresEl = document.createElement("article");
    mainEl.append(highScoresEl);
    let hsH1El = document.createElement('h1');
    hsH1El.textContent = 'High Scores';
    highScoresEl.append(hsH1El);
    let hsOl = document.createElement('ol');
    highScoresEl.append(hsOl);
    

    // get localStorage data
    let savedScoresArray = JSON.parse(localStorage.getItem('highScores'));
    if (savedScoresArray !== null) {
        savedScoresArray.forEach((element) => {
            let hsLi = document.createElement('li');
            hsLi.textContent = this.initials + this.score;
            hsOl.append(hsLi);
        }
        )
    }

    console.log(savedScoresArray);
}

startButt.addEventListener("click", startQuiz);
hsButt.addEventListener("click", highScores);
// homeButt.addEventListener("click", location.reload, useCapture);