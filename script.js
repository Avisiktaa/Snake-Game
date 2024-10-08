let gameContainer=document.querySelector(".gamecontainer")
let scorecontainer=document.querySelector(".scorecontainer")
let foodX,foodY;
let headX=12,headY=12;
let veloX=0,veloY=0;
let score=0;
let snakebody=[];

function generateFood(){
    foodX=Math.floor(Math.random()*25)+1;
    foodY=Math.floor(Math.random()*25)+1;
    for(let i=0;i<snakebody.length;i++)
    {
        if(snakebody[i][1]==foodY && snakebody[i][0]==foodX)
        {
            generateFood();
        }
    }

}

function gameOver(){
    headX=12;
    headY=12;
    generateFood();
    veloX=0;
    veloY=0;
    snakebody=[];
    score=0;
    scorecontainer.innerHTML="Score: "+score;
    alert("Game Over");
}


function renderGame()
{
    let updated=`<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    snakebody.pop();

    if(foodX==headX && headY==foodY)
    {
        snakebody.push([foodX,foodY]);
        generateFood();
        score+=10;
        scorecontainer.innerHTML="Score: "+score;
    }


    headX+=veloX;
    headY+=veloY;
    snakebody.unshift([headX,headY]);

    if(headX==0 || headY==0 || headX==26 || headY==26)
        gameOver();
    
    for(let i=1;i<snakebody.length;i++)
    {
        if(snakebody[0][0]==snakebody[i][0] && snakebody[0][1]==snakebody[i][1])
        {
            gameOver();
        }
    }

    for(let i=0;i<snakebody.length;i++)
    {
        updated+=`<div class="snake" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]};"></div>`;
    }
    
    gameContainer.innerHTML=updated;
}

generateFood();
setInterval(renderGame,150);


document.addEventListener("keydown",function(e){
    console.log(e.key);
    let key=e.key;
    if(key=="ArrowUp" && veloY!=1){
        veloX=0;
        veloY=-1;
    }
    else if(key=="ArrowDown" && veloY!=-1){
        veloX=0;
        veloY=1;
    }
    else if(key=="ArrowLeft" && veloX!=1){
        veloX=-1;
        veloY=0;
    }
    else if(key=="ArrowRight" && veloX!=-1){
        veloX=1;
        veloY=0;
    }
})