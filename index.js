
// ---------------------- INITIAL VALUES ---------------------- //

// Initialize starting values and constants
let pattern = [];
let playerPattern = [];
let gameLevel = 0;
let gameStarted = false;
const h1 = $("h1");
const body = $("body");

const cardColor = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
}

// ---------------------- GAME ---------------------- //

// Start the game
$(document).keydown(() => {
    if (!gameStarted) {
        gameStarted = true;
        levelUp();  
        addRandomColorToPattern(); 
        gamePlay();
    }
});


// ---------------------- FUNCTIONS ---------------------- //

// Gameplay
function gamePlay() {
    // Listen to the incoming clicks
    $(".btn").off("click").click((e) => {
        playerPattern.push(e.target.id);

        // Check if the last elements are the same
        if (pattern[playerPattern.length - 1] === playerPattern[playerPattern.length - 1]) {
            flashCard(e.target.id);
            
            // If the patterns are the same length, level up
            if (pattern.length === playerPattern.length) {
                levelUp()
                addRandomColorToPattern();
            }
        // If wrong pattern, game over
        } else {
            flashCard(e.target.id);
            gameOver();
        }
    });
}


// Add new color element to the color pattern
function addRandomColorToPattern() {
    setTimeout(() => {
        playerPattern = [];
        // Generate random number between 1-4
        var randNr = Math.floor(Math.random() * 4 + 1);

        // Push color to the pattern array and flash it
        var randColor = cardColor[randNr];
        pattern.push(randColor);
        flashCard(randColor);
    }, 1000);

}


// Flash a specified color card
function flashCard(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 250);
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}


// Level up the gameLevel and update the h1 element
function levelUp() {
    gameLevel++;
    h1.text(`Level ${gameLevel}`);
}


// When game over, play the audio, animation and reset variables 
function gameOver() {
    body.addClass("game-over");
    setTimeout(() => {
        body.removeClass("game-over");
    }, 250);

    h1.text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    reset();
    
}


// Resetting the variables
function reset() {
    gameLevel = 0;
    pattern = [];
    playerPattern = [];
    gameStarted = false;
}


