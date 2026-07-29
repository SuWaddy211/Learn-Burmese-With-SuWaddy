/*==========================================
    Learn Burmese with Su
    progress.js
==========================================*/

const STORAGE_KEY = "burmeseProgress";

/*------------------------------------------
    DEFAULT PROGRESS
------------------------------------------*/

const defaultProgress = {

    streak: 0,

    lastPracticeDate: null,

    totalXP: 0,

    lessons: {}

};


/*------------------------------------------
    LOAD
------------------------------------------*/

function loadProgress() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        return structuredClone(defaultProgress);

    }

    return JSON.parse(saved);

}


/*------------------------------------------
    SAVE
------------------------------------------*/

function saveProgress(progress) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
    );

}

/*------------------------------------------
    UPDATE XP
------------------------------------------*/

function awardXP(lessonId, earnedXP) {

    const progress =
        loadProgress();

    const previousXP =
        progress.lessons[lessonId]?.xp || 0;

    if (earnedXP > previousXP) {

        progress.totalXP +=
            earnedXP - previousXP;

        progress.lessons[lessonId] = {

            xp: earnedXP

        };

        saveProgress(progress);

    }

}
