/*==========================================
    Learn Burmese with Su
    lesson.js
==========================================*/


/*------------------------------------------
    GET LESSON ID
------------------------------------------*/

const params = new URLSearchParams(window.location.search);

const lessonId =
    parseInt(params.get("lesson")) || 1;


/*------------------------------------------
    FIND LESSON
------------------------------------------*/

let currentLesson = null;
let currentUnit = null;

for (const unit of courseData.units) {

    const lesson =
        unit.lessons.find(l => l.id === lessonId);

    if (lesson) {

        currentLesson = lesson;
        currentUnit = unit;
        break;

    }

}


/*------------------------------------------
    INVALID LESSON
------------------------------------------*/

if (!currentLesson) {

    alert("Lesson not found.");

    window.location.href = "index.html";

}


/*------------------------------------------
    PAGE TITLE
------------------------------------------*/

document.title =
`${currentLesson.title} | Learn Burmese with Su`;


/*------------------------------------------
    HERO
------------------------------------------*/

document.getElementById("lessonOverviewIcon").textContent =
currentLesson.icon;

document.getElementById("lessonNumber").textContent =
`LESSON ${currentLesson.id}`;

document.getElementById("lessonTitle").textContent =
currentLesson.title;

document.getElementById("lessonDescription").textContent =
currentLesson.description;


/*------------------------------------------
    BREADCRUMB
------------------------------------------*/

const unitLink =
document.getElementById("unitBreadcrumb");

unitLink.textContent =
`Unit ${currentUnit.id}`;

unitLink.href =
`unit.html?unit=${currentUnit.id}`;

document.getElementById("lessonBreadcrumb").textContent =
currentLesson.title;


/*------------------------------------------
    OBJECTIVES
------------------------------------------*/

const objectiveList =
document.getElementById("objectivesList");

objectiveList.innerHTML = "";

currentLesson.objectives.forEach(objective => {

    const li =
    document.createElement("li");

    li.innerHTML = `

        <span class="objective-check">
            ✓
        </span>

        ${objective}

    `;

    objectiveList.appendChild(li);

});


/*------------------------------------------
    LESSON INFORMATION
------------------------------------------*/

document.getElementById("lessonWords").textContent =
`${currentLesson.words} Words`;

document.getElementById("lessonExercises").textContent =
`${currentLesson.exercises} Exercises`;

document.getElementById("lessonDuration").textContent =
currentLesson.duration;

document.getElementById("lessonXp").textContent =
`${currentLesson.xp} XP`;


/*------------------------------------------
    RETURN TO UNIT
------------------------------------------*/

document.getElementById("backToUnitLink").href =
`unit.html?unit=${currentUnit.id}`;

/*------------------------------------------
    TOP NAVIGATION
------------------------------------------*/

document.getElementById("backUnitButton").href =
`unit.html?unit=${currentUnit.id}`;

document.getElementById("backUnitButton").textContent =
`Unit ${currentUnit.id}`;


/*------------------------------------------
    START QUIZ
------------------------------------------*/

document
.getElementById("startPracticeButton")
.addEventListener("click", () => {

    window.location.href =
    `quiz.html?lesson=${currentLesson.id}`;

});
