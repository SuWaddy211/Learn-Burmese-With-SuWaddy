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
