let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$("body").on("click", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});


$(".btn").on("click", function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //
  if (userClickedPattern.length === gamePattern.length) {
    if (checkAns(level)) {
      setTimeout(nextSequence(), 1000);
    }else{

      playSound("wrong");

      $("#level-title").text("Game Over, Press Any Key to Restart");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);


      starOver();
    }
  }
});


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}


function playSound(sound) {
  let audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAns(currentLevel) {
  let j=0;
  for (let i = 0; i < currentLevel; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
        j=1;
    }
  }
  if(j===0){
    return true;
  }else{
    return false;
  }

}

function starOver(){
  gamePattern=[];
  started=false;
  level=0;
}
