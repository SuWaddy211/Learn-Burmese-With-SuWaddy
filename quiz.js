const data = await fetch(currentLesson.practiceFile);
const lesson = await data.json();

const questions = lesson.questions;
