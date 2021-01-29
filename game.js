// alert("Lets Game");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

// 4.3 at the top game.js create a new array

var userClickedPattern = [];

// 7.1.a. way to keep tract of weather if the game has started or not

var started = false;

// 7.2. create variable

var level = 0;


// 7.1. use JQUery to detect when a keyboard key has been pressed

$(document).keypress(function() {
    if (!started) {

        //  change h1 to say "Level ..."
        $("#level-title").text("Level" + " " + level);
        nextSequence();
        started = true;
    }
})


// 4.1 Use JQuery to detect buttons are clicked and trigger a handler function
$(".btn").click(function() {

    // 4.2 create variale to store the id was clicked

    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    // 5.1 in same way we played sound in the nextSquence(), when a user click on a button, the corresponding sound should be played
    playSound(userChosenColour);

    animatePress(userChosenColour);

    // 8.2. call checkAnswer after a user has clicked and chosen their answer.Passing in the index of the last answer in th user's squence
    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {

    // 8.6. nextSequence is triggered, reset the userClickedPattern to an empty arry

    userClickedPattern = [];

    // 7.4. Inside nextSquence(), increase the level by time  nextSquence is called

    level++;

    // Inside nextSquence update h1 with change in the value of level

    $('#level-title').text("Level" + " " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // 3.1. Use JQuery to select the  button with the same id as the randomChosenColour
    // .... $("#"+randomChosenColour)
    // 3.2. animate flash Jquery
    //  .... $("#someElement").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // 5.4 refactor the code in playSound
    playSound(randomChosenColour);

};

// 5.2. create a function that takes a singe input parameter

function playSound(name) {

    // 5.3 take code we used to play sound in the nextSquence function

    // 3.4. playaudio
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

};

// 6.1. create new function with single input parameter

function animatePress(currentColour) {

    // 6.2. use jquery add this pressed class the button that gets clicked inside animatePress

    $('#' + currentColour).addClass('pressed');

    //  6.4. Javascript to remove the pressed class after a 100 milliseconds.

    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);

};


// 8.1. create new function

function checkAnswer(currentLevel) {

    // 8.3 write an if statement inside checkAnswer to check if the most recent user answer is the same as the game pattern

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // 8.4. if statement in step 8.3 the most recent answer is right

        if (userClickedPattern.length === gamePattern.length) {

            //8.5. call nextSquence after 1 second delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");
        // 9.1. play sound wrong.mp3
        playSound("wrong")
            // 9.2. apply class game-over to the body when user gets one of answer wrong, remove after 200miliseconds
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // 9.3 change h1 to say "Game Over, Press Any Key to Restart"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // 10.2 call startOver
        stratOver();
    }
}

// 10.1 create new function
function stratOver() {

    // 10.3  reset the values of level
    level = 0;
    gamePattern = [];
    started = false;

}