'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const redButton = document.getElementById('red_button');
    const greenButton = document.getElementById('green_button');
    const blueButton = document.getElementById('blue_button');
    const yellowButton = document.getElementById('yellow_button');
    const startButton = document.getElementById('start_button');
    const resetButton = document.getElementById('reset_button');
    redButton.addEventListener('click', userResponse);
    greenButton.addEventListener('click', userResponse);
    blueButton.addEventListener('click', userResponse);
    yellowButton.addEventListener('click', userResponse);
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', restartGame);
    
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle_instructions_button');
    const instructions = document.getElementById('instructions');
    
    toggleButton.addEventListener('click', function() {
        if (gameStarted === false) {
            if (instructions.classList.contains('open')) {
                instructions.classList.remove('open');
                instructions.style.maxHeight = '0'; // Collapse section
            } else {
                instructions.classList.add('open');
                instructions.style.maxHeight = '200px'; // Expand section
            }
        } else {
            if (instructions.classList.contains('open')) {
                document.getElementsByClassName('game_board')[0].style.display = 'grid' ;
                instructions.classList.remove('open');
                instructions.style.maxHeight = '0'; // Collapse section
            } else {
                document.getElementsByClassName('game_board')[0].style.display = 'none';
                instructions.classList.add('open');
                instructions.style.maxHeight = '200px'; // Expand section
            }
        }
    });
});


let colors = ['red', 'green', 'blue', 'yellow'];
let count = 1;
let round = 0;
let score = 0;
let gameStarted = false;
let highScore = 0;
let midSequence = false;
let roundSequence = [];
let timeouts = [];

function removeCurrentColor() {
    roundSequence.shift();
    console.log(roundSequence);
}

function disableButtons() {
    colors.forEach(color => {
        const button = document.getElementById(color + '_button');
        button.classList.add('disabled');
        button.disabled = true;
    });
}

function enableButtons() {
    colors.forEach(color => {
        const button = document.getElementById(color + '_button');
        button.classList.remove('disabled');
        button.disabled = false;
    });
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function addColorsToRoundStack(count) {
    midSequence = true;
    disableButtons();
    let delay = 1000; // Start after a delay to ensure any previous action has completed.
    for (let i = 0; i < count; i++) {
        const color = getRandomColor();
        // Store each timeout ID in an array
        timeouts.push(setTimeout(() => highlightColor(color), delay));
        roundSequence.push(color);
        delay += 1500; // Adjust delay for each color highlight
    }
    // Ensure midSequence is set to false and buttons are enabled only after the last color is shown
    timeouts.push(setTimeout(() => {
        enableButtons();
        midSequence = false;
    }, delay));
}


function doesMatchCurrentColor(color) {
    const currentColor = roundSequence[0];
    return currentColor === color;
}

function highlightColor(color) {
    const buttonId = color + '_button';
    const button = document.getElementById(buttonId);
    button.classList.add('highlighted');
    // Ensure we clear this timeout later if needed
    timeouts.push(setTimeout(() => {
        button.classList.remove('highlighted');
    }, 1000));
}

function restartGame() {
    roundSequence = [];
    score = 0;
    round = 1;
    count = 1;
    updateScoreAndRound(score, round);
    addColorsToRoundStack(count);
}

function isSequenceStackEmpty() {
    return roundSequence.length === 0;
}

function goToNextRound() {
    disableButtons(); // Ensure buttons are disabled during the transition
    console.log("Round " + round + " completed. Preparing next round...");
    midSequence = true; // Should be true until the sequence ends

    setTimeout(() => {
        round++;
        count++;
        addColorsToRoundStack(count);
        updateScoreAndRound(score, round); // Update round after incrementing
    }, 2000);
    // Do not set midSequence to false here; it should be set at the end of addColorsToRoundStack
}



function userResponse() {
    if (midSequence || round === 0) {
        return; // Exit if the game is showing sequence or not started
    }
    const color = this.id.split('_')[0];
    if (doesMatchCurrentColor(color)) {
        score++;
        updateScoreAndRound(score, round);
        removeCurrentColor();
        if (isSequenceStackEmpty()) {
            goToNextRound();
        }
    } else {
        disableButtons();
        gameOver(); // Handle game over scenario
    }
}
function updateScoreAndRound(score, round) {
    const highScoreId = document.getElementById('high_score');
    if (score > highScore) {
        highScore = score;
        highScoreId.textContent = highScore;
        highScoreId.classList.add('updated');

        setTimeout(() => {
            highScoreId.classList.remove('updated');
        }, 1000);
    }
    document.getElementById('score').textContent = score;
    document.getElementById('round').textContent = round;
}


function gameOver() {
    // Clear all scheduled timeouts to stop the sequence
    round = 0;
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = []; // Clear the array of timeout IDs

    document.getElementsByClassName('game_score')[1].style.visibility = 'hidden';
    document.getElementsByClassName('game_round')[0].style.visibility = 'hidden';
    const gameOverMessage = document.getElementById('game_over_message');
    gameOverMessage.style.visibility = 'visible';

    setTimeout(() => {
        gameOverMessage.style.visibility = 'hidden';
        document.getElementsByClassName('game_score')[1].style.visibility = 'visible';
        document.getElementsByClassName('game_round')[0].style.visibility = 'visible';
    }, 3000);
}

function startGame() {
    const start_button = document.getElementById('start_button');
    start_button.style.display = 'none';
    roundSequence = [];
    score = 0;
    round = 1;
    gameStarted = true;
    document.getElementsByClassName('game_status')[0].style.display = 'block'; 
    document.getElementById('reset_button').style.display = 'inline-block';
    updateScoreAndRound(score, round);
    addColorsToRoundStack(count);
    console.log(roundSequence);
}

