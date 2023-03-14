const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let x = 10;
let y = 10;
const size = 10;

// choose the side of the snake
let direction = "right";

// apple random location
let appleX = Math.floor(Math.random() * canvas.width / size) * size;
let appleY = Math.floor(Math.random() * canvas.height / size) * size;

const snake = [{ x, y }];


const gameLoop = () => {
 
  const tail = snake.pop();
  
  
  switch (direction) {
    case "right":
      x += size;
      break;
    case "left":
      x -= size;
      break;
    case "up":
      y -= size;
      break;
    case "down":
      y += size;
      break;
  }

// bump into wall
  if (x < 0) {
    x = canvas.width - size;
  } else if (x >= canvas.width) {
    x = 0;
  } else if (y < 0) {
    y = canvas.height - size;
  } else if (y >= canvas.height) {
    y = 0;
  }
  

  snake.unshift({ x, y });
  
 
  if (x === appleX && y === appleY) {
    // snake increase height
    snake.push(tail);
    
    // apple random location
    appleX = Math.floor(Math.random() * canvas.width / size) * size;
    appleY = Math.floor(Math.random() * canvas.height / size) * size;
  }
  
  // Drawing snake
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, size, size));
  
  // Drawing apple
  ctx.fillStyle = "red";
  ctx.fillRect(appleX, appleY, size, size);
  
  // SNAKE speed
  setTimeout(gameLoop, 80);
};

// Control remote
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37: // Left
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38: // Up
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39: // Right
      if (direction !== "left") {
       
        direction = "right";
    }
    break;
    case 40: // Down
    if (direction !== "up") {
    direction = "down";
    }
    break;
    }
    });
    
    
    gameLoop();