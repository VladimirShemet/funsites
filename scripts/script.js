let prog = 0;
const numOfQuestions = 5;
const unit = 100 / numOfQuestions;
let correctAnswer = 1;
let answerStats = [];
let isGameEnded = true;

const questions = [
    q1 = {
        headline: 'How many cows spawn in the Meadow_1?',
        answers: ['12', '6', '4'],
        correctAnsw: 2
    },
    q2 = {
        headline: 'How many slots in the inventory do you have?',
        answers: ['8', '6', '11'],
        correctAnsw: 2
    },
    q3 = {
        headline: 'How many hours does a milkman sleep?',
        answers: ['10', '8', '6', 'Endless'],
        correctAnsw: 4
    },
    q4 = {
        headline: 'What font does Moo-Moo Meadows.exe use?',
        answers: ['Gamepixies', 'Roboto'],
        correctAnsw: 1
    },
    q5 = {
        headline: 'Have you seen a UFO?',
        answers: ['No way', 'Yeah'],
        correctAnsw: 2
    },
    q6 = {
        headline: 'What color is the milk?',
        answers: ['Red', 'Blue', 'Pink', 'Purple', 'Cyan', 'Ultraviolet'],
        correctAnsw: 3
    },
    q6 = {
        headline: 'At what time does the UFO spawn',
        answers: ['23:00', '12:00', '01:00'],
        correctAnsw: 1
    },
    q6 = {
        headline: 'What company own Moo-Moo Meadows?',
        answers: ['Microsoft', 'Blackrock', 'Junkyminds', 'Lucasfilm'],
        correctAnsw: 3
    }
];

const motivationPhrases = ['A tough one, huh?', 'Keep up!', 'Think carefully ', 'Take you time'];

function progress() {
    if(!isGameEnded) {
        if (prog >= (100 - unit)) {
            prog+=unit
            document.getElementById("progress-bar").value = prog;
            endGame();
        }else {
            next();
            prog+=unit
            document.getElementById("progress-bar").value = prog;
        }
    }
}

function next() {
    clear();
    const newQuestion = Math.ceil(Math.random() * questions.length - 1);
    loadQuestion(questions[newQuestion].headline, questions[newQuestion].answers, questions[newQuestion].correctAnsw);
}

function loadQuestion (questionHeadline, answers, correctAnsw) {
    document.body.querySelector('.question-headline').innerHTML = questionHeadline;
    document.body.querySelector('.description').innerHTML = `"${motivationPhrases[Math.ceil(Math.random() * motivationPhrases.length - 1)]}"`;
    let i = 0;
    for (; i < answers.length; i++) {
        document.body.querySelector(".quiz-container").innerHTML += `<button id="${i+1}" onclick="checkCorrect(this.id);" class="button-answer">${answers[i]}</button>`;
    }
    correctAnswer = correctAnsw;
}

function clear() {
    document.body.querySelector(".quiz-container").innerHTML = '';
}

function checkCorrect(id) {
   if(Number(id) === correctAnswer) {
        answerStats[answerStats.length] = true;
    }else {
        answerStats[answerStats.length] = false;
    }
    progress();
}

function endGame() {
    isGameEnded = true;
    clear();
    let wins = 0;
    let losses = 0;
    for (let itbe of answerStats) {
        if(itbe === true) {
            wins +=1;
        }else {
            losses +=1
        }
    }
    if(wins > losses) {
        document.body.querySelector('.question-headline').innerHTML = `You WON! stats: ${wins} correct of ${numOfQuestions}`;
    }else {
        document.body.querySelector('.question-headline').innerHTML = `You LOST! stats: ${wins} correct of ${numOfQuestions}`;
    }
    document.body.querySelector(".quiz-container").innerHTML += `<Button class="button-start" onclick="restart()">Restart</Button>`;
    document.body.querySelector('.description').innerHTML = '';
}

function restart () {
    isGameEnded = false;
    prog = 0;
    document.getElementById("progress-bar").value = 0;
    answerStats = [];
    next();
}