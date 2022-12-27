// Author: Vardhan Patil(DitherWither)

let questions;

let selectedOption;
let currentQuestion
let questionNumber = 0;
let correctAnswerDisplay = document.getElementById("correct-answer-display");
let wrongAnswerDisplay = document.getElementById("wrong-answer-display");
let noSelectedAnswerDisplay = document.getElementById("no-selected-answer-display");

function startQuiz() {
    document.getElementById("quiz-display").hidden = false;
    document.getElementById("result-display").hidden = true;
    document.getElementById("input-display").hidden = true;
    setQuestion(questions[0]);
}

function resetChoices() {

    document
        .getElementsByName("quiz-option")
        .forEach(
            radioButton => {
                radioButton.checked = false;
            }
        );
}

function setAnswerDisplay(value) {
    if (value == "correct") {
        correctAnswerDisplay.hidden = false;
        wrongAnswerDisplay.hidden = true;
        noSelectedAnswerDisplay.hidden = true;
    } else if (value == "wrong") {
        correctAnswerDisplay.hidden = true;
        wrongAnswerDisplay.hidden = false;
        noSelectedAnswerDisplay.hidden = true;
    } else if (value == "none") {
        correctAnswerDisplay.hidden = true;
        wrongAnswerDisplay.hidden = true;
        noSelectedAnswerDisplay.hidden = false;
    } else {
        correctAnswerDisplay.hidden = true;
        wrongAnswerDisplay.hidden = true
        noSelectedAnswerDisplay.hidden = true;
    }
}

function nextQuestion() {
    questionNumber += 1;
    if (questionNumber < questions.length) {
        setQuestion(questions[questionNumber])
        document
            .getElementById("next-button")
            .hidden = true;

        document.getElementsByName("quiz-option").forEach(
            element => element.disabled = false
        );

        document.getElementsByName("quiz-option").forEach(
            element => element.checked = false

        )

        setAnswerDisplay("reset")
        selectedOption = undefined;
    } else {
        displayResults()
    }
}


function setQuestion(question) {
    currentQuestion = question;
    document
        .getElementsByClassName("question-text")[0]
        .innerHTML = ((questionNumber + 1) + ' of ' + questions.length + ': ' + currentQuestion.name);

    currentQuestion.isFirstAttempt = true;


    let elements = document.getElementsByClassName("option-text");
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = question.options[i]
    }
}

function submit() {
    if (selectedOption == currentQuestion.correct_option) {
        setAnswerDisplay("correct");
        document
            .getElementById("next-button")
            .hidden = false;

        document.getElementsByName("quiz-option").forEach(
            element => element.disabled = true
        );
    } else if (selectedOption == undefined) {
        setAnswerDisplay("none")
    }
    else {
        currentQuestion.isFirstAttempt = false;
        setAnswerDisplay("wrong");
    }
}

function displayResults() {
    let totalCorrect = 0;
    questions.forEach(
        question => {
            if (question.isFirstAttempt == true) {
                totalCorrect += 1;
            }
        }
    )

    if (totalCorrect < questions.length / 2) {
        document.getElementById("result-marks-display").style.backgroundColor = "#ED333B";
    }

    document
        .getElementById("marks-display")
        .innerHTML = "You got " + totalCorrect + " of " + questions.length + " correct."

    document
        .getElementById("quiz-display")
        .hidden = true;
    document
        .getElementById("result-display")
        .hidden = false;
}

async function loadFile() {
    questions = JSON.parse(
        await document
            .getElementById("file-upload")
            .files[0]
            .text()
    )
    startQuiz()
}
document
    .getElementById("submit-button")
    .addEventListener("click", submit);

document
    .getElementsByName("quiz-option")
    .forEach(radioButton => {
        radioButton.addEventListener('click', () => {
            selectedOption = radioButton.value;
        })
    }
    );

document
    .getElementById("next-button")
    .addEventListener("click", nextQuestion);

document
    .getElementById("file-upload")
    .addEventListener("click",
        () => document.getElementById("start-quiz-button").hidden = false
    )

document
    .getElementById("start-quiz-button")
    .addEventListener("click", loadFile)