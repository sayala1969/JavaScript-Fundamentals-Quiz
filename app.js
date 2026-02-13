const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("results-container");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-button");

const myQuestions = [
    {
        question: "What is the capital of the United States?", 
        answers: [
            { text: "A) Little Rock", correct: false },
            { text: "B) Austin", correct: false },
            { text: "C) Washington D.C.", correct: true },
            { text: "D) Boston", correct: false }
        ]
    },
    {
        question: "What is 1 + 2?", 
        answers: [
            { text: "A) 3", correct: true },
            { text: "B) 4", correct: false },
            
            { text: "C) 5", correct: false },
            { text: "D) 6", correct: false }
        ]
    },
    {
        question: "Who wrote 'Harry Potter'?", 
        answers: [
            { text: "A) Harper Lee", correct: false },
            { text: "B) J.K. Rowling", correct: true },
            { text: "C) Ernest Hemingway", correct: false },
            { text: "D) Mark Twain", correct: false }
    ]
    }
];


let score = 0;
let currentQuestionIndex = 0;



nextButton.addEventListener("click", () => {
    const selectedAnswer = answerButtons.querySelector("button.selected");
    if (selectedAnswer) {
        // Mark the correct answer in green
        const allButtons = answerButtons.querySelectorAll("button");
        allButtons.forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("green");
            }

        });
        
        // Mark the selected answer
        if (selectedAnswer.dataset.correct === "true") {
            score++;
        } else {
            selectedAnswer.classList.add("red");
        }
        nextButton.setAttribute("disabled", "true");
        setTimeout(() => {
            if (currentQuestionIndex < myQuestions.length - 1) {
                currentQuestionIndex++;
                setNextQuestion();
            } else {
                showResults();
            }

            nextButton.removeAttribute("disabled");
        }, 3000);
    } else {
        alert("Please select an answer before proceeding.");
    }
})

restartButton.addEventListener("click", () => {
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
    questionContainer.style.display = "block";
    resultContainer.style.display = "none"; 
}

    function setNextQuestion() {
        resetState();
        showQuestion(myQuestions[currentQuestionIndex]);
    }
    
    function showQuestion(question) {
        questionText.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            if (answer .correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        });
    }
        function resetState() {
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
            nextButton.innerText =  "Next";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild); 
            }
            nextButton.innerText = "Next";
    
    
        }
    
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true"; 

    document.querySelectorAll("button.btn").forEach(button => {
        button.disabled = true;
    });

    const prevSelected = answerButtons.querySelector("button.selected");
    if (prevSelected) {
        prevSelected.classList.remove("selected");
    }
    selectedButton.classList.add("selected");
}

    function showResults() {
        let finalScore = 0;
        const allButtons = answerButtons.querySelectorAll("button.selected");
        questionContainer.style.display = "none";
        resultContainer.style.display = "block";
        scoreText.innerText = `You scored ${score} out of ${myQuestions.length} questions correctly.`;
    }

    startQuiz();