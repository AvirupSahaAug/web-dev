var userClickedPattern=[];
var level =0;
var gamePattern=[];
function startOver(){
    userClickedPattern=[];
    level =0;
    gamePattern=[];

}
function ani(file){
    $("."+file).addClass("pressed");
    setTimeout(function (){
        $("."+file).removeClass("pressed");
    },100);
}
 function audio(file){
     var aud= new Audio("sounds/"+file+".mp3");
     aud.play();

 }
var randomChosenColor;
var buttonColors=["red", "blue", "green", "yellow"];

function nextSequence(){
    var n =(Math.floor(Math.random()*4));
    randomChosenColor=buttonColors[n];
    
    gamePattern.push(randomChosenColor);
    level++;
    audio(randomChosenColor);
    ani(randomChosenColor);
    console.log(gamePattern);
    $("h1").text("level: "+level);

}
$(document).on("keypress",function (){
    if (userClickedPattern.length==0 && gamePattern.length==0){
        nextSequence();
        console.log("wee");
        

    }
});



$(".btn").on("click",function (){
    var a =$(this).attr("id");
    
    if(gamePattern.length!=0){
        audio(a);
        ani(a);
        userClickedPattern.push(a);
        console.log(userClickedPattern);
    }
    checkAnswer(userClickedPattern.length-1);

    
    

});

function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                userClickedPattern=[];
                nextSequence();
            },1000);
        }

    }
    else{
        console.log("wrong")
        gameOver();
    }

    
}
function gameOver(){
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setInterval(function (){
        
        $("body").removeClass("game-over");
        
    },200);
    
    startOver();
    
    console.log("potato")
}
