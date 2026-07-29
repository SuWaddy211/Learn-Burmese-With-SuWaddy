/*==========================================
    Learn Burmese with Su
    unit.js
==========================================*/


/*------------------------------------------
    GET UNIT ID
------------------------------------------*/

const params = new URLSearchParams(window.location.search);

const unitId = parseInt(params.get("unit")) || 1;


/*------------------------------------------
    LOAD UNIT
------------------------------------------*/

const unit = courseData.units.find(u => u.id === unitId);

if (!unit) {

    document.body.innerHTML = `
        <h1 style="text-align:center;margin-top:100px;">
            Unit not found.
        </h1>
    `;

    throw new Error("Invalid unit ID");

}


/*------------------------------------------
    UNIT HEADER
------------------------------------------*/

document.getElementById("unitIcon").innerText = unit.icon;

document.getElementById("unitLabel").innerText =
    `UNIT ${unit.id}`;

document.getElementById("unitTitle").innerText =
    unit.title;

document.getElementById("unitDescription").innerText =
    unit.description;


/*------------------------------------------
    LOCAL STORAGE
------------------------------------------*/

/*
Each lesson is stored like:

lesson1 = completed
lesson2 = locked

*/

function getLessonStatus(lessonId) {

    const saved = localStorage.getItem("lesson" + lessonId);

    if (saved) return saved;

    return null;

}


/*------------------------------------------
    BUILD LESSON CARDS
------------------------------------------*/

const lessonContainer =
    document.getElementById("lessonContainer");

let completedCount = 0;

unit.lessons.forEach((lesson, index) => {

    let status = getLessonStatus(lesson.id);

    // First lesson is always available

    if (!status) {

        if (index === 0 && unit.id === 1) {

            status = "available";

        }

        else {

            const previousLesson =
                unit.lessons[index - 1];

            if (
                previousLesson &&
                getLessonStatus(previousLesson.id) === "completed"
            ) {

                status = "available";

            }

            else {

                status = lesson.status;

            }

        }

    }


    if (status === "completed") {

        completedCount++;

    }


    const card =
        document.createElement("div");

    card.className = "lesson-card";


    /*--------------------------
        AVAILABLE
    --------------------------*/

    if (status === "available") {

        card.innerHTML = `

            <div class="lesson-icon">

                ${lesson.icon}

            </div>

            <h3>

                Lesson ${lesson.id}

            </h3>

            <h2>

                ${lesson.title}

            </h2>

            <p>

                ${lesson.description}

            </p>

            <div class="lesson-meta">

                <span>📖 ${lesson.words} Words</span>

                <span>📝 ${lesson.exercises} Exercises</span>

                <span>⏱ ${lesson.duration}</span>

            </div>

            <button
                class="primary-btn"
                onclick="startLesson(${lesson.id})">

                Start Lesson →

            </button>

        `;

    }


    /*--------------------------
        COMPLETED
    --------------------------*/

    else if (status === "completed") {

        card.innerHTML = `

            <div class="lesson-icon">

                ${lesson.icon}

            </div>

            <h3>

                Lesson ${lesson.id}

            </h3>

            <h2>

                ${lesson.title}

            </h2>

            <p>

                ✅ Completed

            </p>

            <div class="lesson-meta">

                <span>📖 ${lesson.words} Words</span>

                <span>📝 ${lesson.exercises} Exercises</span>

                <span>⭐ ${lesson.xp} XP</span>

            </div>

            <button
                class="secondary-btn"
                onclick="startLesson(${lesson.id})">

                Review Lesson

            </button>

        `;

    }


    /*--------------------------
        LOCKED
    --------------------------*/

    else {

        card.classList.add("locked");

        card.innerHTML = `

            <div class="lesson-icon">

                🔒

            </div>

            <h3>

                Lesson ${lesson.id}

            </h3>

            <h2>

                ${lesson.title}

            </h2>

            <p>

                Complete the previous lesson first.

            </p>

            <div class="lesson-meta">

                <span>📖 ${lesson.words} Words</span>

                <span>📝 ${lesson.exercises} Exercises</span>

                <span>⏱ ${lesson.duration}</span>

            </div>

        `;

    }


    lessonContainer.appendChild(card);

});


/*------------------------------------------
    PROGRESS
------------------------------------------*/

const totalLessons =
    unit.lessons.length;

const percentage =
    Math.round(
        (completedCount / totalLessons) * 100
    );

document.getElementById("progressFill").style.width =
    percentage + "%";

document.getElementById("progressPercent").innerText =
    percentage + "%";

document.getElementById("progressText").innerText =
    `${completedCount} / ${totalLessons} Lessons Completed`;


/*------------------------------------------
    START LESSON
------------------------------------------*/

function startLesson(id) {

    window.location.href =
        "lesson.html?lesson=" + id;

}