// game constants and game variables

let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("move.mp3");
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
let speed = 5;
let snakearr = [{ x: 11, y: 15 }];
let lastPaintTime = 0;
let food = { x: 6, y: 7 };
let score=0;


// game functions

function main(ctime) { //ctime is used togenerate the time
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collide(snake){
    // if you bump into your self

    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
            return true;
        }        
    }

    // if you bump into wall

    if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine() {
    // part 1 -->updating snake and food
    if(collide(snakearr)){
        gameOverSound.play();
        inputDir={x:0,y:0};
        alert("Game Over :( Press ctrl + R to refresh the game");
        snakearr = [{ x: 13, y: 15 }];
        score=0;
    }

    //if you have eaten the food regenerate the food
    if (snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodSound.play();
        // display score

        score++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highscorebox.innerHTML="Hiscore: " + hiscoreval;
        }
        scorebox.innerHTML="  Score : "+ score;


        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y});
        let a=2,b=16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //move the snake
    for (let i =  snakearr.length-2; i >=0; i--) {
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;

    // part 2 -->display /rendre snake and food
    //display snake
    playArea.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        playArea.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playArea.appendChild(foodElement);

}


// main logic behind the game
let hiscore=localStorage.getItem("hiscore");

if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    }else{
        hiscoreval=JSON.parse(hiscore);
        highscorebox.innerHTML="Highscore: "+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    moveSound.play();
    inputDir={x:0,y:1};
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow UP");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }
})
