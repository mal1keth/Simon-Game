var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var count = 0;
var base_Case= false;
buttonColours=["green","red","yellow","blue"];

$("div").on("click", function(event){

  if (base_Case == true){
    console.log(event.target);
    userClickedPattern.push(this.classList[0]);

    console.log(userClickedPattern)
    console.log(gamePattern)

    animate(event.target);
    playAudio(this.classList[0]);

    checkAns(userClickedPattern.length-1);
  }
})

$(document).one("keypress click", function(event){
  base_Case = true;
  nextSequence();
  console.log(event.target)
})

function nextSequence(){
  count=0;
  userClickedPattern = [];
  level+=1
  $("h1").text("Level "+level);
  var randNum = Math.floor(Math.random()*4)
  $("div."+buttonColours[randNum]).fadeToggle();

  setTimeout(function(){
    $("div."+buttonColours[randNum]).fadeToggle();
  },0);
  gamePattern.push(buttonColours[randNum]);
  console.log(gamePattern);
  playAudio(buttonColours[randNum]);
  }


function playAudio(name){
  var audio = new Audio("sounds/"+name+ ".mp3")
  audio.play();
}
function animate(colour){
  $(colour).addClass("pressed")
  setTimeout(function(){
    $(colour).removeClass("pressed");
  },208)
}
function checkAns(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] || gamePattern.length==0) {
        count+=1;
        if (count===gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
     else {
      playAudio("wrong");
      $("body").addClass("game__Over");
      $("h1").text("Game Over");

      setTimeout(function () {
        $("body").removeClass("game__Over");
        location.reload();
      }, 2000);
    }
}
