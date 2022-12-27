// Author: Vardhan Patil(DitherWither)

let questions = []

let currentQuestionIndex = 0;

let quizDisplay = document.getElementById("quiz-display")
let questionName = document.getElementById("name");
let options = document.getElementsByClassName("option");
let correctOption = document.getElementById("correct-option");
let questionNumberDisplay = document.getElementById("question-number-display")

let questionsNumInput = document.getElementById("questions-num");
let questionsNumPicker = document.getElementById("questions-num-picker");

let totalQuestionsNum;

function saveQuestionToObject() {
    questions[currentQuestionIndex].name = questionName.value;
    for (let i = 0; i < options.length; i++) {
        questions[currentQuestionIndex].options[i] = options[i].value;
    }

    questions[currentQuestionIndex].correct_option = correctOption.value - 1

}

function downloadQuestions() {
    saveQuestionToObject()
    downloadObjectAsJson(questions, "quiz")
}

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function setQuestionNumber(question_number) {
    saveQuestionToObject()
    currentQuestionIndex = question_number;
    questionNumberDisplay.innerHTML = `Question ${question_number + 1} of ${totalQuestionsNum}`;
    if (currentQuestionIndex + 1 >= totalQuestionsNum) {
        document.getElementById("next-button").hidden = true;
        document.getElementById("mobile-next-button").hidden = true;
    } else {
        document.getElementById("next-button").hidden = false;
        document.getElementById("mobile-next-button").hidden = false;

    } 
    
    if ( currentQuestionIndex - 1 < 0 ) {
        document.getElementById("previous-button").hidden = true;
        document.getElementById("mobile-previous-button").hidden = true;
    } else  {
        document.getElementById("previous-button").hidden = false;
        document.getElementById("mobile-previous-button").hidden = false;

    }

    questionName.value = questions[currentQuestionIndex].name;
    for (let i = 0; i < options.length; i++) {
        options[i].value = questions[currentQuestionIndex].options[i]
    }

    correctOption.value = questions[currentQuestionIndex].correct_option + 1
}

function setUpQuizMaker() {
    totalQuestionsNum = questionsNumInput.value;
    questionsNumPicker.hidden = true;
    quizDisplay.hidden = false;
    for (let i = 0; i < totalQuestionsNum; i += 1) {
        questions[i] = {
            name: "",
            options: ["", "", "", ""],
            correct_option: 0
        };
    }
    setQuestionNumber(0)
}

document
    .getElementById("create-button")
    .addEventListener('click', downloadQuestions);

document
    .getElementById("questions-num-button")
    .addEventListener('click', setUpQuizMaker);

document
    .getElementById("next-button")
    .addEventListener('click', 
        () => {
            setQuestionNumber(currentQuestionIndex + 1);
        }
    )

document
    .getElementById("previous-button")
    .addEventListener( 'click',
        () => {
            setQuestionNumber(currentQuestionIndex - 1)
        }
    )

document
    .getElementById("mobile-next-button")
    .addEventListener('click', 
        () => {
            setQuestionNumber(currentQuestionIndex + 1);
        }
    )

document
    .getElementById("mobile-previous-button")
    .addEventListener( 'click',
        () => {
            setQuestionNumber(currentQuestionIndex - 1)
        }
    )
