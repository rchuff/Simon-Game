var buttonColors = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).on("keydown", function() {
  //if not completed then ignore button push
  //if completed then reset game to Level 1
  if (level === 0) {
    newLevel();
  }
});


$("div.btn").on("click", function(event) {
  //checks button clicked and adds it to the userClickedPattern array
    var color = event.currentTarget.id;
    buttonNoise(color);
    buttonPressAnimation(color);
    userClickedPattern.push(color);
    var successClick = patternTrack();
    //wrong click flashes game-over class and resets game
    if (successClick !== true) {
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 100);
      var wrongClick = new Audio("sounds/wrong.mp3");
      wrongClick.play();
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      $("h1").text("Game Over, Press Any Key to Restart 💀");
    }

    //validates that user is done guessing then updates the level
    else if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        newLevel();
      },1000);
    }

  });


//updates level heading and resets userClickedPattern variable
function newLevel() {
  level++;
  $("h1").text("Level " + level);
  var newColor = nextSequence();
  gamePattern.push(newColor);
  buttonNoise(newColor);
  $("div #" + newColor).animate({
    opacity: 0.1
  }, 400).animate({
    opacity: 1
  }, 400);
  userClickedPattern = [];
}

//ensure the button clicked was the correct color in the pattern
function patternTrack() {
  var validate;
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (gamePattern[i] !== userClickedPattern[i]) {
        validate = false;
        break;
      } else {
        validate = true;
      }
    }
  return validate;
}

//choose random color for next sequence
function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColor = buttonColors[randomNumber];
  return randomChosenColor;
}

//Add in funtion for noise for each button when event triggered
function buttonNoise(btnColor) {
  var sound = new Audio("sounds/" + btnColor + ".mp3");
  sound.play();
}

//Add animation for each button when clicked
function buttonPressAnimation(buttonColor) {
  $("div." + buttonColor).addClass("pressed");
  setTimeout(function() {
    $("div." + buttonColor).removeClass("pressed");
  }, 100);
}
