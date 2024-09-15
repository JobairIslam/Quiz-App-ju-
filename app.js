const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Rome", correct: false },
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Hydrogen", correct: false },
      { text: "Nitrogen", correct: false },
    ],
  },
];

const questionEle = document.getElementById("question");
const answerEle = document.getElementById("answer-buttons");
const nextEle = document.getElementById("next-btn");

let curr = 0;
let score = 0;

function resetState() {
  // Clear the previous answer buttons
  while (answerEle.firstChild) {
    answerEle.removeChild(answerEle.firstChild);
  }
}

function showQuestion() {
  resetState();
  let currQun = questions[curr];
  let qunNo = curr + 1;
  questionEle.innerHTML = qunNo + ". " + currQun.question;

  currQun.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerEle.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  if (correct) {
    score++;
  }
  Array.from(answerEle.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (questions.length > curr + 1) {
    nextEle.classList.remove("hide");
  } else {
    nextEle.innerHTML = "Restart";
    nextEle.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showNextQuestion() {
  curr++;
  if (curr < questions.length) {
    showQuestion();
  } else {
    alert("Quiz completed! Your score is " + score + "/" + questions.length);
    showQuiz();
  }
}

nextEle.addEventListener("click", () => {
  nextEle.classList.add("hide");
  showNextQuestion();
});

function showQuiz() {
  curr = 0;
  score = 0;
  nextEle.innerHTML = "Next";
  nextEle.classList.add("hide");
  showQuestion();
}

showQuiz();
