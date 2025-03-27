const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Transfer Markup Language", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Which programming language is primarily used for Android app development?",
        answers: [
            { text: "Swift", correct: false },
            { text: "Java", correct: true },
            { text: "C#", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "What is the output of 'console.log(typeof [])' in JavaScript?",
        answers: [
            { text: "object", correct: true },
            { text: "array", correct: false },
            { text: "function", correct: false },
            { text: "string", correct: false }
        ]
    },
    {
        question: "Which country won the FIFA World Cup in 2018?",
        answers: [
            { text: "Germany", correct: false },
            { text: "Argentina", correct: false },
            { text: "France", correct: true },
            { text: "Brazil", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "HO2", correct: false }
        ]
    },
    {
        question: "Which year did World War II end?",
        answers: [
            { text: "1943", correct: false },
            { text: "1945", correct: true },
            { text: "1939", correct: false },
            { text: "1950", correct: false }
        ]
    },
    {
        question: "What is the speed of light?",
        answers: [
            { text: "299,792,458 m/s", correct: true },
            { text: "300,000,000 m/s", correct: false },
            { text: "150,000,000 m/s", correct: false },
            { text: "3,000,000 m/s", correct: false }
        ]
    },
    {
        question: "Which of these is NOT a JavaScript framework?",
        answers: [
            { text: "React", correct: false },
            { text: "Django", correct: true },
            { text: "Vue", correct: false },
            { text: "Angular", correct: false }
        ]
    }
];


let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const scoreDisplay = document.getElementById("score");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers.fill(null);
    scoreDisplay.innerText = "Score: 0";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");

        if (selectedAnswers[currentQuestionIndex] !== null && selectedAnswers[currentQuestionIndex] === index) {
            button.classList.add(answer.correct ? "correct" : "wrong");
        }

        button.addEventListener("click", () => selectAnswer(button, answer.correct, index));
        answerButtons.appendChild(button);
    });

    prevButton.classList.toggle("hide", currentQuestionIndex === 0);
    nextButton.innerText = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

function resetState() {
    answerButtons.innerHTML = "";
    nextButton.classList.add("hide");
}

function selectAnswer(button, isCorrect, index) {
    selectedAnswers[currentQuestionIndex] = index;

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (questions[currentQuestionIndex].answers.find(ans => ans.text === btn.innerText && ans.correct)) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
        }
    });

    if (isCorrect) {
        if (selectedAnswers[currentQuestionIndex] === index) {
            score++;
        }
    }

    scoreDisplay.innerText = `Score: ${score}`;
    nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

function endQuiz() {
    questionElement.innerText = `Quiz Over! You scored ${score} out of ${questions.length}.`;
    answerButtons.innerHTML = "";
    prevButton.classList.add("hide");
    nextButton.innerText = "Restart Quiz";
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
