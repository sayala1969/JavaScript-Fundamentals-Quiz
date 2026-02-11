const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-quiz");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-question");
const submitQuizButton = document.getElementById("submit-quiz");
const resultContainer = document.getElementById("results-container");
const resultButton = document.getElementById("view-results");
const restartButton = document.getElementById("restart-button");

let questions = ["Question 1: What is the capital of the United States?", "Question 2: What is 1 + 2?", "Question 3: Who wrote 'Harry Potter'?"];
let options = [
    ["A) Little Rock", "B) Austin", "C) Washington D.C.", "D) Boston"],
    ["A) 3", "B) 4", "C) 5", "D) 6"],
    ["A) Harper Lee", "B) J.K. Rowling", "C) Ernest Hemingway", "D) Mark Twain"]
];
let answers = ["C", "A", "B"];
let userAnswers = [];
let currentQuestionIndex = 0;

startButton.addEventListener("click", startQuiz);
// nextButton.addEventListener("click", displayQuestion);
submitQuizButton.addEventListener("click", submitQuiz);
// resultButton.addEventListener("click", viewResults);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() { 
    startButton.style.display = "none";
    displayQuestion();
   
}

function displayQuestion() {
    quizContainer.innerHTML = "";
    if (currentQuestionIndex < questions.length) {
        const questionElement = document.createElement("h2");
        questionElement.textContent = questions[currentQuestionIndex];
        quizContainer.appendChild(questionElement);

        options[currentQuestionIndex].forEach(option => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.addEventListener("click", () => selectAnswer(option.charAt(0)));
            quizContainer.appendChild(optionButton);
        });
    } else {
        submitQuizButton.style.display = "block";
    }
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    currentQuestionIndex++;
    displayQuestion();
}

function submitQuiz() {
    submitQuizButton.style.display = "none";
    resultButton.style.display = "block";
}

function viewResults() {
    resultContainer.innerHTML = "";
    let score = 0;

    questions.forEach((question, index) => {
        const resultElement = document.createElement("p");
        const userAnswer = userAnswers[index] || "No answer";
        const correctAnswer = answers[index];
        resultElement.textContent = `Question ${index + 1}: ${question} - Your answer: ${userAnswer} - Correct answer: ${correctAnswer}`;
        resultContainer.appendChild(resultElement);
        if (userAnswer === correctAnswer) {
            score++;
        }
    });

    const scoreElement = document.createElement("h3");
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
    resultContainer.appendChild(scoreElement);
    restartButton.style.display = "block";
}

function restartQuiz() {
    userAnswers = [];
    currentQuestionIndex = 0;
    resultContainer.innerHTML = "";
    restartButton.style.display = "none";
    startButton.style.display = "block";
}       
