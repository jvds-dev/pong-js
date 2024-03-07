const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 80;
let y = 200;
let DefaultXSpeed = 5;
let DefaultYSpeed = 10;
let xSpeed = DefaultXSpeed;
let ySpeed = DefaultYSpeed;
let squareSize = 40;
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
    ctx.fillStyle = "#fff333";
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

let pcScore = 0;
function checkCollision() {
    if (x == 40 + paddleWidth && x + squareSize >= 40 && y + squareSize >= leftPaddleY && y <= leftPaddleY + paddleHeight) {
        toRight = true;
        xSpeed += 1;
        
        if(downPressed){
            toBottom = true;
        }
        else if(upPressed){
            toBottom = false;
        }
    }
    if(x <= 0){
        pcScore++;
        xSpeed = 0;
        ySpeed = 0;
        launched = false;
        x = 50;
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
        y = leftPaddleY;
        x = 100;
        xSpeed = 0;
        ySpeed = 0;
    }
}


const xBall = document.getElementById("x-ball");
const yBall = document.getElementById("y-ball");
const yPaddle = document.getElementById("y-paddle");
const xSpeedDisplay = document.getElementById("x-speed");
const pcScoreDisplay = document.getElementById("pc-score");

function updateDisplay(){
    xBall.textContent = `x: ${x}`;
    yBall.textContent = `y: ${y}`;
    yPaddle.textContent = `PaddleY: ${leftPaddleY}`;
    xSpeedDisplay.textContent = `xSpeed: ${xSpeed}`;
    pcScoreDisplay.textContent = `PC-Score: ${pcScore}`;

}


function animate() {
    requestAnimationFrame(animate);
    launch();
    // checkWinner();
    checkCollision();
    moveX();
    moveY();
    movePaddle();
    updateDisplay();
    drawSquare();
}
animate();
    