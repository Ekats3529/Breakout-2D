var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const backGround = new Image();
backGround.src = 'img/background.png';

var ballRadius = 12;
var x = canvas.width / 2;
var y = canvas.height-30;
var dx = 1;
var dy = -1;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;


const brickRowCount = Math.floor(Math.random() * 6) + 2;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

var lives = 3;
var score = 0;
var win_score = 0;
var startGame = false;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: Math.floor(Math.random() * 3) + 1};
    win_score += bricks[c][r].status;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keySpaceHandler, false);

  
function keyDownHandler(e) {
    if(e.code  == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.code == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.code  == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}


function keySpaceHandler(e) {
    if(e.code == "Space") {
        startGame = true;
    }
}


function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
}


function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status > 0) {
                if(x + ballRadius > b.x && x - ballRadius  < b.x+brickWidth && y + ballRadius > b.y && y - ballRadius< b.y+brickHeight) {
                    dy = -dy;
                    b.status --;
                    score++;
                        if(score == win_score) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                }
            }
        }
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#00FA9A";
            ctx.fill();
            ctx.closePath();
        }

        if (bricks[c][r].status === 2) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#D2691E";
            ctx.fill();
            ctx.closePath();
        }

        if (bricks[c][r].status === 3) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#B22222";
            ctx.fill();
            ctx.closePath();
        }
      }
    }
  } 

function drawLives() {
    ctx.font = "16px Arial Black";
    ctx.fillStyle = "#FFEFD5";
    ctx.fillText("Lives: " +lives, canvas.width - 80, 20);
  }


function drawScore() {
    ctx.font = "16px Arial Black";
    ctx.fillStyle = "#FFEFD5";
    ctx.fillText("Score: "+score, 8, 20);
}


function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(backGround, 0, 0);
    
    drawBricks();
    if (!startGame){
        x = paddleX + paddleWidth / 2;
        y = canvas.height - 30;
    }
    drawBall();
    drawPaddle();
    drawLives();
    drawScore();
    collisionDetection();

    if (startGame){
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius - paddleHeight / 2) {
            if(x > paddleX - paddleWidth / 3 && x < paddleX + paddleWidth + paddleWidth/3) {
                dy = -dy;
            }
            else {
                lives--;
                startGame = false;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 1;
                    dy = -1;
                    paddleX = (canvas.width-paddleWidth) / 2;
                }
            }
    }
}

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
