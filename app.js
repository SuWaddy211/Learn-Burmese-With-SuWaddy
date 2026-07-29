/*==========================================
    Learn Burmese with Su
    app.js
==========================================*/


/*------------------------------------------
    LOCAL STORAGE
------------------------------------------*/

const xp =
    parseInt(localStorage.getItem("xp")) || 0;

const streak =
    parseInt(localStorage.getItem("streak")) || 0;

const words =
    parseInt(localStorage.getItem("words")) || 0;


/*------------------------------------------
    DASHBOARD
------------------------------------------*/

document.getElementById("xp").textContent = xp;
document.getElementById("streak").textContent = streak;
document.getElementById("words").textContent = words;


/*------------------------------------------
    BUILD UNIT CARDS
------------------------------------------*/

const unitContainer =
    document.getElementById("unitContainer");

courseData.units.forEach(unit => {

    const card =
        document.createElement("div");

    card.className = "lesson-card";

    const completedLessons =
        unit.lessons.filter(lesson =>
            localStorage.getItem("lesson" + lesson.id) === "completed"
        ).length;

    const totalLessons =
        unit.lessons.length;

    const completedUnit =
        completedLessons === totalLessons;

    let unlocked = false;

    if (unit.id === 1) {

        unlocked = true;

    } else {

        const previousUnit =
            courseData.units.find(u => u.id === unit.id - 1);

        if (previousUnit) {

            const previousComplete =
                previousUnit.lessons.every(lesson =>
                    localStorage.getItem("lesson" + lesson.id) === "completed"
                );

            unlocked = previousComplete;

        }

    }

    if (unlocked) {

        card.innerHTML = `

            <h3>${unit.icon} ${unit.title}</h3>

            <p>${unit.description}</p>

            <p>
                📚 ${totalLessons} Lessons
            </p>

            <p>
                ⭐ ${unit.difficulty}
            </p>

            <p>
                ${
                    completedLessons
                } / ${
                    totalLessons
                } Completed
            </p>

            <button onclick="openUnit(${unit.id})">

                ${
                    completedUnit
                        ? "Review Unit"
                        : "Open Unit"
                }

            </button>

        `;

    }

    else {

        card.classList.add("locked");

        card.innerHTML = `

            <h3>🔒 ${unit.title}</h3>

            <p>${unit.description}</p>

            <p>
                Complete Unit ${unit.id - 1} first.
            </p>

        `;

    }

    unitContainer.appendChild(card);

});


/*------------------------------------------
    OPEN UNIT
------------------------------------------*/

function openUnit(id){

    window.location.href =
        "unit.html?unit=" + id;

}


/*------------------------------------------
    CONTINUE LEARNING
------------------------------------------*/

function startLesson(){

    for(const unit of courseData.units){

        for(const lesson of unit.lessons){

            const status =
                localStorage.getItem(
                    "lesson" + lesson.id
                );

            if(status !== "completed"){

                window.location.href =
                    "lesson.html?lesson=" + lesson.id;

                return;

            }

        }

    }

    window.location.href =
        "unit.html?unit=1";

}


/*------------------------------------------
    SCROLL
------------------------------------------*/

function scrollToLessons(){

    document
        .getElementById("lessons")
        .scrollIntoView({

            behavior:"smooth"

        });

}
