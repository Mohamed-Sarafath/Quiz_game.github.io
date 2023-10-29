const questions = [
    {
        question: "which is longest animal in the world?",
        answers: [
            {text: "shark", correct: "false"},
            {text: "Blue whale", correct: "true"},
            {text: "crocodile", correct: "false"},
            {text: "lion", correct: "false"},

        ]
    },
    {
        question: "which is smallest contry in the world?",
        answers: [
            {text: "Wathikaan", correct: "true"},
            {text: "india", correct: "false"},
            {text: "australia", correct: "false"},
            {text: "england", correct: "false"},

        ]
    },
    {
        question: "which is not a operating system",
        answers: [
            {text: "windows", correct: "false"},
            {text: "unix", correct: "false"},
            {text: "ubundu", correct: ""},
            {text: "chrome", correct: "true"},

        ]
    }
];

const questionElemnet = document.getElementById("Question");
const answerButton = document.getElementById("answer-btn");
const NextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
score = 0;

function startQuiz(){
    let currentQuestionIndex = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElemnet.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    NextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    NextButton.style.display = "block";
}

function showScore(){
    resetState(); 
    questionElemnet.innerHTML = `Your Score ${score} out of ${questions.length}!`;
    NextButton.innerHTML = "Play Again";
    NextButton.style.display = "block";

}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <  questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


NextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();