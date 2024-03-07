const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 80;
let y = 200;
let DefaultXSpeed = 20;
let DefaultYSpeed = 5;
let xSpeed = DefaultXSpeed;
let ySpeed = DefaultYSpeed;
let squareSize = 20;
let toRight = true;
let toBottom = true;
let paddleHeight = 100;
let paddleWidth = 20;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let upPressed = false;
let downPressed = false;

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        upPressed = true;
    } else if (e.key === 'ArrowDown') {
        downPressed = true;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowUp') {
        upPressed = false;
    } else if (e.key === 'ArrowDown') {
        downPressed = false;
    }
});

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#55ff66";
    ctx.fillRect(x, y, squareSize, squareSize);
    ctx.fillRect(40, leftPaddleY, paddleWidth, paddleHeight);
}

function moveX() {
    if (toRight) {
        if (x + squareSize < canvas.width) {
            x += xSpeed;
        } else {
            toRight = false;
        }
    } else {
        if (x > 0) {
            x -= xSpeed;
        } else {
            toRight = true;
        }
    }
}

function moveY() {
    if (toBottom) {
        if (y + squareSize < canvas.height) {
            y += ySpeed;
        } else {
            toBottom = false;
        }
    } else {
        if (y > 0) {
            y -= ySpeed;
        } else {
            toBottom = true;
        }
    }
}

function movePaddle() {
    if (upPressed && leftPaddleY > 0) {
        leftPaddleY -= 10;
    } else if (downPressed && leftPaddleY + paddleHeight < canvas.height) {
        leftPaddleY += 10;
    }
}

let highScore = 0;
let playerScore = 0;

function checkHighScore(){
    if(playerScore > highScore){
        highScore = playerScore;
    }
}

function checkCollision() {
    if (x == 40 + paddleWidth && x + squareSize >= 40 && y + squareSize >= leftPaddleY && y <= leftPaddleY + paddleHeight) {
        toRight = true;
        xSpeed += 1;
        playerScore++;
        playSound("pong-au");
        
        if(downPressed){
            toBottom = true;
        }
        else if(upPressed){
            toBottom = false;
        }
    }
    if(x <= 0){
        xSpeed = 0;
        ySpeed = 0;
        launched = false;
        x = 50;
        checkHighScore();
        playerScore = 0;
    }
}

document.addEventListener('keydown', function(e) {
    if(!launched){
        if (e.key === 'a') {
            xSpeed = DefaultXSpeed;
            ySpeed = DefaultYSpeed;
            launched = true;
        }
    }
});

let launched = false;
function launch(){
    if(!launched){
        y = leftPaddleY + 35;
        x = 100;
        xSpeed = 0;
        ySpeed = 0;
        toRight = true;
    }
}


const xBall = document.getElementById("x-ball");
const yBall = document.getElementById("y-ball");
const yPaddle = document.getElementById("y-paddle");
const xSpeedDisplay = document.getElementById("x-speed");
const highScoreDisplay = document.getElementById("highScore");
const playerScoreDisplay = document.getElementById("playerScore");

function updateDisplay(){
    xBall.textContent = `x: ${x}`;
    yBall.textContent = `y: ${y}`;
    yPaddle.textContent = `PaddleY: ${leftPaddleY}`;
    xSpeedDisplay.textContent = `xSpeed: ${xSpeed}`;
    highScoreDisplay.textContent = highScore;
    playerScoreDisplay.textContent = playerScore;

}


function playSound(soundID){
    let audio = document.getElementById(soundID)
    audio.play();
}


function animate() {
    requestAnimationFrame(animate);
    launch();
    checkCollision();
    moveX();
    moveY();
    movePaddle();
    updateDisplay();
    drawSquare();
}
animate();
    