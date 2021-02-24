// *****VARIABLES***** //

var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// ***** BUTTON CLICKED ***** //

$(".btn").on("click", function() {

  if(started) {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)
}

});

// ***** KEY PRESS ***** //

$(document).on("keypress", function() {

  if (!started) {
  $("#level-title").text("Level " + level)

  setTimeout(function() {
    nextSequence()
  }, 300);

  started = true
}

});

// ***** LOGIC FUNCTIONS ***** //

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

  gamePattern.push(randomChosenColour);

  level++
  $("#level-title").text("Level " + level)
};


function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

if(userClickedPattern.length === gamePattern.length) {

  setTimeout(function() {
    nextSequence()
  }, 1000);

}
  } else {
    playSound("wrong")
    $("body").addClass("game-over")
    $("#level-title").text("Game Over, Press Any Key to Restart")

    setTimeout(function() {
      $("body").removeClass("game-over")
    },200)

    startOver()
  }
}


function startOver() {
  level = 0
  gamePattern = []
  started = false;
}

// ***** ANIMATION FUNCTIONS ***** //

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")

  var delayInMilliseconds = 100;

setTimeout(function() {
  $("#" + currentColour).removeClass("pressed")
}, delayInMilliseconds);
};
