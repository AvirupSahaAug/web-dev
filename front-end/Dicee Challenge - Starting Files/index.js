randomNumber1=Math.floor(Math.random()*6)+1;
document.getElementsByClassName("img1")[0].src="images/dice"+randomNumber1+".png";
randomNumber2=Math.floor(Math.random()*6)+1;
document.getElementsByClassName("img2")[0].src="images/dice"+randomNumber2+".png";
if(randomNumber1>randomNumber2){
    document.getElementsByTagName("h1")[0].textContent="Player 1 wins";
}
else if(randomNumber1<randomNumber2){
    document.getElementsByTagName("h1")[0].textContent="Player 2 wins";
}
else{
    document.getElementsByTagName("h1")[0].textContent="Draw!";
}