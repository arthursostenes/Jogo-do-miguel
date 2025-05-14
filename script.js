const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = spawnFood();

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.key;
  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#0f0" : "#090";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // Desenha a comida
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, box, box);

  // Move a cobra
  const head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  else if (direction === "RIGHT") head.x += box;
  else if (direction === "UP") head.y -= box;
  else if (direction === "DOWN") head.y += box;

  // Fim de jogo: parede ou si mesmo
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameLoop);
    alert("Game Over!");
    return;
  }

  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }
}

const gameLoop = setInterval(drawGame, 100);