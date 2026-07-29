/*==========================================
    Learn Burmese with Su
    quiz.js
==========================================*/

let currentLesson;
let currentUnit;

let quizData = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


/*==========================================
    INITIALIZE QUIZ
==========================================*/

async function initializeQuiz() {

    const params = new URLSearchParams(window.location.search);

    const lessonId =
        parseInt(params.get("lesson")) || 1;

    const result =
        getLessonById(lessonId);

    if (!result) {

        alert("Lesson not found.");

        window.location.href = "index.html";

        return;

    }

    currentLesson = result.lesson;
    currentUnit = result.unit;

    document.title =
        currentLesson.title + " Quiz";

    document.getElementById("lessonTitle").textContent =
        currentLesson.title;

    document.getElementById("lessonLabel").textContent =
        `Lesson ${currentLesson.id}`;

    document.getElementById("backLesson").href =
        `lesson.html?lesson=${currentLesson.id}`;

    await loadQuestions();

}


/*==========================================
    LOAD JSON
==========================================*/

async function loadQuestions() {

    try {

        const response =
            await fetch(currentLesson.practiceFile);

        if (!response.ok) {

            throw new Error("Cannot load lesson file.");

        }

        const data =
            await response.json();

        quizData = data.questions;

        showQuestion();

    }

    catch(error){

        console.error(error);

        alert("Unable to load quiz.");

    }

}

/*==========================================
    SHOW QUESTION
==========================================*/

function showQuestion(){

    answered = false;

    const question =
        quizData[currentQuestion];

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("feedback").textContent = "";

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    question.options.forEach((option,index)=>{

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            option;

        button.onclick = () =>
            checkAnswer(index);

        answers.appendChild(button);

    });

    updateProgress();

}

/*==========================================
    PROGRESS
==========================================*/

function updateProgress(){

    const total =
        quizData.length;

    const percent =
        Math.round(
            (currentQuestion / total) * 100
        );

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} / ${total}`;

    document.getElementById("progressPercent").textContent =
        `${percent}%`;

    document.getElementById("progressFill").style.width =
        `${percent}%`;

}

/*==========================================
    CHECK ANSWER
==========================================*/

function checkAnswer(choice){

    if(answered){

        return;

    }

    answered = true;

    const question =
        quizData[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach((button,index)=>{

        button.disabled = true;

        if(index === question.answer){

            button.classList.add("correct");

        }

        if(index === choice && choice !== question.answer){

            button.classList.add("wrong");

        }

    });

    if(choice === question.answer){

        score++;

    }

    document.getElementById("feedback").textContent =
        question.explanation;

    setTimeout(nextQuestion,1500);

}

/*==========================================
    NEXT QUESTION
==========================================*/

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= quizData.length){

        finishQuiz();

        return;

    }

    showQuestion();

}

initializeQuiz();

/*==========================================
    FINISH QUIZ
==========================================*/

function finishQuiz() {

    if(!isLessonCompleted(currentLesson.id)){
        // Mark current lesson as completed
        completeLesson(currentLesson.id);

        // Award XP
        awardXP(currentLesson.xp);}

    // Unlock next lesson
    const next = getNextLesson(currentLesson.id);

    let unlockText = "Fantastic! You completed this lesson.";

    if (next) {

        unlockLesson(next.lesson.id);

        unlockText =
            `🎉 Lesson ${next.lesson.id} - ${next.lesson.title} has been unlocked!`;

    }

    // Update completion modal
    document.getElementById("completeLessonTitle").textContent =
        currentLesson.title;

    document.getElementById("correctAnswers").textContent =
        `${score}/${quizData.length}`;

    document.getElementById("earnedXP").textContent =
        currentLesson.xp;

    document.getElementById("unlockMessage").textContent =
        unlockText;

    document.getElementById("completeScreen").style.display =
        "flex";

}

/*==========================================
    AWARD XP
==========================================*/

function awardXP(amount){

    let xp =
        parseInt(localStorage.getItem("xp")) || 0;

    xp += amount;

    localStorage.setItem("xp", xp);

}

/*==========================================
    CONTINUE
==========================================*/

document
.getElementById("continueButton")
.addEventListener("click", () => {

    window.location.href =
        `unit.html?unit=${currentUnit.id}`;

});

