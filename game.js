let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let snake = [{ x: 10, y: 10 }];
let snakeDirection = 'right';
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && snakeDirection !== 'down') {
        snakeDirection = 'up';
    } else if (e.key === 'ArrowDown' && snakeDirection !== 'up') {
        snakeDirection = 'down';
    } else if (e.key === 'ArrowLeft' && snakeDirection !== 'right') {
        snakeDirection = 'left';
    } else if (e.key === 'ArrowRight' && snakeDirection !== 'left') {
        snakeDirection = 'right';
    }
});

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let head = { ...snake[0] };
    if (snakeDirection === 'up') head.y--;
    if (snakeDirection === 'down') head.y++;
    if (snakeDirection === 'left') head.x--;
    if (snakeDirection === 'right') head.x++;
    
    snake.unshift(head); 
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('scoreText').textContent = 'Score: ' + score;
        generateFood();
    } else {
        snake.pop(); 
    }
    
    if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10 || isSnakeColliding(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score is ' + score);
    }
    
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10));
    food.y = Math.floor(Math.random() * (canvas.height / 10));
}

function isSnakeColliding(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

document.getElementById('startGameBtn').addEventListener('click', () => {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = 'right';
    score = 0;
    document.getElementById('scoreText').textContent = 'Score: 0';
    generateFood();
    gameInterval = setInterval(drawGame, 100);
});
