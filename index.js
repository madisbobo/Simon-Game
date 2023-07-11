// Pattern array initialized
var pattern = [];
var playerPattern = [];
var gameLvl = 1;
var gameStarted = false;

// Color object/dict initialized
var cardColor = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
}

// Start the game
$("body").keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        $("h1").text(`Level ${gameLvl}`);
        addNewColor();
        gamePlay();
    }
});


// Gameplay
function gamePlay() {
    // Listen to the incoming clicks
    $(".btn").off("click").click(function (e) {
        playerPattern.push(e.target.id);

        // Check if the last elements are the same
        if (pattern[playerPattern.length - 1] === playerPattern[playerPattern.length - 1]) {
            flashCard(e.target.id);
            
            // If the patterns are the same length, level up
            if (pattern.length === playerPattern.length) {
                levelUp()
                addNewColor();
            }
        } else {
            flashCard(e.target.id);
            gameOver();
        }

    });
}


function addNewColor() {
    setTimeout(() => {
        playerPattern = [];
        // Generate random number between 1-4
        var randNr = Math.floor(Math.random() * 4 + 1);

        // Push color to the pattern array and flash it
        var randColor = cardColor[randNr];
        pattern.push(randColor);
        flashCard(randColor);

        console.log("computer:" + JSON.stringify(pattern));
        console.log("player:" + JSON.stringify(playerPattern));
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


function levelUp() {
    gameLvl++;
    $("h1").text(`Level ${gameLvl}`);
}


function gameOver() {
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 250);

    $("h1").text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    reset();
    
}

function reset() {
    gameLvl = 1;
    pattern = [];
    playerPattern = [];
    gameStarted = false;
}


