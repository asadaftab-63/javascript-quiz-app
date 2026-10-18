const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");

const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const questionCounter = document.getElementById("question-counter");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// 2. QUESTIONS KA DATA

const questions = [
  {
    question: "What is JavaScript?",
    options: [
      "A programming language",
      "A database",
      "An operating system",
      "A web browser",
    ],
    answer: "A programming language",
  },

  {
    question: "Which keyword declares a variable that can be reassigned?",
    options: ["const", "let", "fixed", "static"],
    answer: "let",
  },

  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<css>", "<js>", "<script>", "<javascript>"],
    answer: "<script>",
  },
];

//3. VARIABLES

let currentQuestionIndex = 0;

let score = 0;

let answered = false;

let timeLeft = 15;

let timerInterval;

// 4. QUESTION SHOW KARNA

function showQuestion() {
  // Current question nikalna
  const currentQuestion = questions[currentQuestionIndex];

  // Naye question ke liye answer status reset
  answered = false;

  // Question show karna
  questionElement.textContent = currentQuestion.question;

  // Question counter update karna
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Progress bar update karna
  progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  // Purane options clear karna
  optionsContainer.innerHTML = "";

  // Next button disable karna
  nextButton.disabled = true;

  // Har option ka button banana
  currentQuestion.options.forEach(function (option) {
    const button = document.createElement("button");

    button.textContent = option;

    button.classList.add("option-btn");

    // Button click hone par answer check karna
    button.addEventListener("click", function () {
      checkAnswer(button, option);
    });

    // Button webpage par add karna
    optionsContainer.appendChild(button);
  });

  // Naye question ka timer start karna
  startTimer();
}

// ======================================
// 5. ANSWER CHECK KARNA
// ======================================

function checkAnswer(selectedButton, selectedOption) {
  // Agar answer pehle hi diya ja chuka hai,
  // toh function ko rok do
  if (answered === true) {
    return;
  }

  // Answer submit ho gaya
  answered = true;

  // Timer stop karna
  clearInterval(timerInterval);

  // Next button enable karna
  nextButton.disabled = false;

  // Current question nikalna
  const currentQuestion = questions[currentQuestionIndex];

  // Saare option buttons select karna
  const allButtons = optionsContainer.querySelectorAll(".option-btn");

  // Saare buttons disable karna
  allButtons.forEach(function (button) {
    button.disabled = true;
  });

  // Check karna ki answer correct hai ya wrong
  if (selectedOption === currentQuestion.answer) {
    // Correct answer
    selectedButton.classList.add("correct");

    // Score mein 1 add karna
    score++;

    console.log("Correct answer!");

    console.log("Score:", score);
  } else {
    // Wrong answer
    selectedButton.classList.add("wrong");

    console.log("Wrong answer!");

    console.log("Score:", score);

    // Correct answer ko green highlight karna
    allButtons.forEach(function (button) {
      if (button.textContent === currentQuestion.answer) {
        button.classList.add("correct");
      }
    });
  }
}

// 6. NEXT QUESTION PAR JANA

function nextQuestion() {
  // Safety check: bina answer diye next na ho
  if (answered === false) {
    return;
  }

  // Agle question par jana
  currentQuestionIndex++;

  // Check karna ki questions bache hain ya nahi
  if (currentQuestionIndex < questions.length) {
    // Agla question show karna
    showQuestion();
  } else {
    // Quiz complete ho gayi
    showResult();
  }
}

// ======================================
// 7. TIMER START KARNA
// ======================================

function startTimer() {
  // Purana timer stop karna
  clearInterval(timerInterval);

  // Timer ko 15 seconds par reset karna
  timeLeft = 15;

  // Timer webpage par show karna
  timerElement.textContent = `Time: ${timeLeft}s`;

  // Har second timer update karna
  timerInterval = setInterval(function () {
    // Ek second kam karna
    timeLeft--;

    // Naya time show karna
    timerElement.textContent = `Time: ${timeLeft}s`;

    // Check karna ki time khatam hua ya nahi
    if (timeLeft <= 0) {
      // Timer stop karna
      clearInterval(timerInterval);

      // Answer lock karna
      answered = true;

      // Next button enable karna
      nextButton.disabled = false;

      // Saare options select karna
      const allButtons = optionsContainer.querySelectorAll(".option-btn");

      // Options disable karna aur correct answer highlight karna
      allButtons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === questions[currentQuestionIndex].answer) {
          button.classList.add("correct");
        }
      });

      // Time khatam hone ka message
      timerElement.textContent = "Time's up!";

      console.log("Time is up!");
    }
  }, 1000);
}


// 8. RESULT SCREEN SHOW KARNA


function showResult() {
  // Timer stop karna
  clearInterval(timerInterval);

  // Quiz screen hide karna
  quizScreen.classList.add("hidden");

  // Result screen show karna
  resultScreen.classList.remove("hidden");

  // Final score show karna
  finalScore.textContent = `${score} / ${questions.length}`;

  // Score ke according message show karna
  if (score === questions.length) {
    resultMessage.textContent = "Excellent! All answers are correct! ";
  } else if (score >= questions.length / 2) {
    resultMessage.textContent = "Great job! Keep practicing! ";
  } else {
    resultMessage.textContent = "Keep learning! You can do better! ";
  }

  // Console mein final score
  console.log("Quiz completed!");

  console.log("Final Score:", score);
}

// 9. QUIZ RESTART KARNA

function restartQuiz() {
  // Timer stop karna
  clearInterval(timerInterval);

  // Question index reset karna
  currentQuestionIndex = 0;

  // Score reset karna
  score = 0;

  // Answer status reset karna
  answered = false;

  // Quiz screen show karna
  quizScreen.classList.remove("hidden");

  // Result screen hide karna
  resultScreen.classList.add("hidden");

  // Pehla question dobara show karna
  showQuestion();
}

// 10. BUTTONS KO FUNCTIONS SE CONNECT KARNA

// Next button click hone par nextQuestion chalega
nextButton.addEventListener("click", nextQuestion);

// Restart button click hone par restartQuiz chalega
restartButton.addEventListener("click", restartQuiz);

// 11. QUIZ START KARNA

// Page load hone par pehla question show hoga
showQuestion();
