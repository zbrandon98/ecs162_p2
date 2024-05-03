'use strict';

const moles = document.querySelectorAll('.mole');
let lastMole = null;
let finish = false;
let score = 0;
let highScore = 0;
let gameActive = false;
let difficulties = ['Easy', 'Medium', 'HARD'];
let difficulty = difficulties[0];


function display_instructions() {
    const description = document.getElementById('text_description');
    const message = 'Click on the moles as they appear to score points. You have 10 seconds to score as many points as possible. Good luck!';
    if (description.innerHTML === message) {
        description.style.display = 'none';
        description.innerHTML = '';
        return;
    }
    description.style.display = 'block';
    description.innerHTML = message;

}

function displayDescription() {
    const description = document.getElementById('text_description');
    const message = 'You are the hammer and the hammer is the killer.';
    if (description.innerHTML === message) {
        description.style.display = 'none';
        description.innerHTML = '';
        return;
    }
    description.style.display = 'block';
    description.innerHTML = message;
}

function instructionButtonClick() {
    const instructionsButton = document.getElementById('instructions');
    instructionsButton.addEventListener('click', display_instructions);
}

function descriptionButtonClick() {
    const descriptionButton = document.getElementById('show_description');
    descriptionButton.addEventListener('click', displayDescription);
}

function getNextDifficulty(currentDifficulty) {
    const idx = difficulties.indexOf(currentDifficulty);
    if (idx === difficulties.length - 1) {
        return difficulties[0];
    }
    return difficulties[idx + 1];
}

function setDifficulty() {
    const difficultySelectorButton = document.getElementById('difficulty_selector');
    const currentDifficulty = difficultySelectorButton.innerHTML;
    const nextDifficulty = getNextDifficulty(currentDifficulty);
    difficultySelectorButton.innerHTML = nextDifficulty;
    difficulty = nextDifficulty;
}

function setDifficultyButtonClick() {
    const difficulty_selector = document.getElementById('difficulty_selector');
    difficulty_selector.addEventListener('click', setDifficulty);
}

function startGameButtonClick() {
    const startGameButton = document.getElementById('start_button');
    startGameButton.addEventListener('click', startGame);
}

function loadingMenu() {
    const gameAreaPlay = document.getElementById('game_area_play');
    const gameControls = document.getElementById('game_controls');
    const gameScoreboard = document.getElementById('game_scoreboard');
    const gameMenu = document.getElementsByClassName('game_menu')[0];
    gameAreaPlay.style.display = 'none';
    gameControls.style.display = 'none';
    gameScoreboard.style.display = 'none';
    gameMenu.style.display = 'flex';
    finish = true;
}

function quitGameButtonClick() {
    const quitGameButton = document.getElementById('game_quit');
    quitGameButton.addEventListener('click', loadingMenu);
}

function restartGame() {
    startGame();
}
function restartGameButtonClick() {
    const restartGameButton = document.getElementById('game_restart');
    restartGameButton.addEventListener('click', restartGame);
}

document.addEventListener('DOMContentLoaded', startGameButtonClick);
document.addEventListener('DOMContentLoaded', setDifficultyButtonClick);
document.addEventListener('DOMContentLoaded', instructionButtonClick);
document.addEventListener('DOMContentLoaded', descriptionButtonClick);
document.addEventListener('DOMContentLoaded', quitGameButtonClick);
document.addEventListener('DOMContentLoaded', restartGameButtonClick);

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomMole(moles) {
    const idx = Math.floor(Math.random() * moles.length);
    const mole = moles[idx];
    if (mole === lastMole) {
        return randomMole(moles);
    }
    lastMole = mole;
    return mole;
}

function peep() {
    let time = randomTime(400, 1000);

    if (difficulty === 'Easy') {
        time = randomTime(800, 1200);
    } else if (difficulty === 'Medium') {
        time = randomTime(600, 1000);
    } else {
        time = randomTime(400, 800);
    }
    const mole = randomMole(moles);
    mole.style.display = 'block';
    setTimeout(() => {
        mole.style.display = 'none';
        if (!finish) {
            peep();
        }
    }, time);
}

function readySetGo() {
    const gameTime = document.getElementsByClassName('game_time')[0];
    gameTime.innerHTML = 'Ready...';
    setTimeout(() => gameTime.innerHTML = 'Set...', 1000);
    setTimeout(() => gameTime.innerHTML = 'Go!', 2000);
    setTimeout(() => gameTime.innerHTML = 'Time: <span id="time">0</span>', 3000);
    
}

function displayGame() {
    const gameScoreboard = document.getElementById('game_scoreboard');
    const gameArea = document.getElementById('game_area_play');
    const gameControls = document.getElementById('game_controls');
    gameControls.style.display = 'flex';
    gameScoreboard.style.display = 'flex';
    gameArea.style.display = 'grid';

}
function startGame() {
    hideMenu();
    displayGame();
    readySetGo();
    finish = false;
    score = 0;
    setTimeout(() => {startTimer();}, 3000);
    setTimeout(() => {peep();}, 3000);
    setTimeout(() => finish = true, 13000) 
}

function startTimer() {
    let timeElapsed = 13; 
    let text = 'Time: ' + (timeElapsed - 3) + 's';
    const timeDisplay = document.getElementsByClassName('game_time')[0];
    timeDisplay.innerHTML = text;

    const timerInterval = setInterval(() => {
        timeElapsed -= 1; 
        text = 'Time: ' + (timeElapsed - 3) + 's';
        timeDisplay.innerHTML = text; 

        if (finish === true || timeElapsed <= 0) {
            clearInterval(timerInterval); 
        }
    }, 1000);
}



function updateScore() {
    const scoreBoard = document.getElementById('score');
    const highScoreBoard = document.getElementById('game_highscore');
    scoreBoard.innerHTML = score;

    if (score > highScore) {
        highScore = score;
        highScoreBoard.innerHTML = highScore;
    }
}

moles.forEach(mole => mole.addEventListener('click', () => {
    if (!finish) {
        score++;
        updateScore();
        mole.style.display = 'none';
        console.log('Score:', score);
    }
}));

function hideMenu() {
    const menu = document.getElementsByClassName('game_menu')[0];
    menu.style.display = 'none';
}

function hideGame() {
    const game_scoreboard = document.getElementById('game_scoreboard');
    const game_area = document.getElementById('game_area');
    game_scoreboard.style.display = 'none';
    game_area.style.display = 'none';
}

function loadGame() {
    hideGame();
}


