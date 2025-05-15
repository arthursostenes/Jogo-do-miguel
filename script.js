const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = spawnFood();

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function setDirection(dir) {
  if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
  if (dir === "UP" && direction !== "DOWN") direction = "UP";
  if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setDirection("LEFT");
  if (e.key === "ArrowRight") setDirection("RIGHT");
  if (e.key === "ArrowUp") setDirection("UP");
  if (e.key === "ArrowDown") setDirection("DOWN");
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw snake
  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "#0f0" : "#090";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // draw food
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, box, box);

  // move
  const head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  const hitWall = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
  const hitSelf = snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y);

  if (hitWall || hitSelf) {
    alert("Game Over!");
    clearInterval(game);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }
}

const game = setInterval(draw, 100);
