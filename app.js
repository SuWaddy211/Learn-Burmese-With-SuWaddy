/*==========================================
    Learn Burmese with Su
    app.js
==========================================*/


/* -------------------------
    COURSE DATA
--------------------------*/

const units = [

{
    id:1,
    title:"Getting Started",
    description:"Build the foundations of Burmese through introductions, family, sentence structure and pronouns.",
    emoji:"📘",
    lessons:4,
    difficulty:"Beginner",
    status:"available"
},

{
    id:2,
    title:"Daily Life",
    description:"Learn Burmese for food, shopping, transportation and directions.",
    emoji:"🍜",
    lessons:4,
    difficulty:"Beginner+",
    status:"locked"
},

{
    id:3,
    title:"Grammar",
    description:"Master important grammar concepts and sentence patterns.",
    emoji:"📖",
    lessons:4,
    difficulty:"Intermediate",
    status:"locked"
},

{
    id:4,
    title:"Conversation",
    description:"Apply everything through real-life conversations.",
    emoji:"💬",
    lessons:4,
    difficulty:"Intermediate",
    status:"locked"
}

];


/* -------------------------
    LOCAL STORAGE
--------------------------*/

let xp =
parseInt(localStorage.getItem("xp")) || 0;

let streak =
parseInt(localStorage.getItem("streak")) || 0;

let words =
parseInt(localStorage.getItem("words")) || 0;

let currentLesson =
parseInt(localStorage.getItem("currentLesson")) || 1;


/* -------------------------
    UPDATE DASHBOARD
--------------------------*/

document.getElementById("xp").innerText = xp;
document.getElementById("streak").innerText = streak;
document.getElementById("words").innerText = words;


/* -------------------------
    BUILD LESSON CARDS
--------------------------*/

const unitContainer =
document.getElementById("unitContainer");

units.forEach(unit=>{

    let card=document.createElement("div");

    card.className="lesson-card";

    if(unit.status==="locked"){

        card.innerHTML=`

            <h3>${unit.emoji} ${unit.title}</h3>

            <p>${unit.description}</p>

            <p>📚 ${unit.lessons} Lessons</p>

            <p>🔒 Coming Soon</p>

        `;

    }

    else{

        card.innerHTML=`

            <h3>${unit.emoji} ${unit.title}</h3>

            <p>${unit.description}</p>

            <p>📚 ${unit.lessons} Lessons</p>

            <p>⭐ ${unit.difficulty}</p>

            <button onclick="openUnit(${unit.id})">

                Open Unit →

            </button>

        `;

    }

    unitContainer.appendChild(card);

});


/* -------------------------
    OPEN LESSON
--------------------------*/

function openUnit(id){

    window.location.href =
    "unit.html?unit=" + id;

}


/* -------------------------
    CONTINUE BUTTON
--------------------------*/

function startLesson(){

    openLesson(currentLesson);

}


/* -------------------------
    SCROLL
--------------------------*/

function scrollToLessons(){

    document.getElementById("lessons")
    .scrollIntoView({

        behavior:"smooth"

    });

}