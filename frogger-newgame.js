/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable default-case */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
console.log('start frog!');

// Create the Game Area!

const frogRoad = {
  canvas: document.createElement('canvas'),
  frames: 0,
  // eslint-disable-next-line func-names
  start: function () {
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(playFrog, 40);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  // score: function()
  // restart: function()
  // pause: function()
};

// Create the Frog!

class Frog {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.lifes = 3;
    this.immunity = false;
  }

  newPosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateFrog() {
    // const ctx = frogRoad.context;
    frogRoad.context.fillStyle = 'red';
    frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const frogger = new Frog(20, 20, 600, 560);

// Create the User Interactions!

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38: // up arrow
      frogger.speedY -= 9;
      break;
    case 40: // down arrow
      frogger.speedY += 9;
      break;
    case 37: // left arrow
      frogger.speedX -= 9;
      break;
    case 39: // right arrow
      frogger.speedX += 9;
      break;
  }
};

// eslint-disable-next-line no-unused-vars
document.onkeyup = (e) => {
  frogger.speedX = 0;
  frogger.speedY = 0;
};

// Create the Obstacles!

const createObstacles = [];

class RoadObstacles {
  constructor(width, height, x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.SpeedX = 0;
    this.SpeedY = 0;
    this.power = true;
  }

  move() {
    frogRoad.context.fillStyle = 'green';
    frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const updateObstacles = () => {
  frogRoad.frames += 1;
  let x = frogRoad.canvas.width;
  let y = frogRoad.canvas.height;
  if (frogRoad.frames % 150 === 0) {
    for (let roadCounter = 0; roadCounter < 7; roadCounter += 1) {
      if (roadCounter % 2 === 0) {
        y -= 80;
        createObstacles.push(new RoadObstacles(60, 20, x, y));
      } else {
        x = 0;
        y -= 80;
        createObstacles.push(new RoadObstacles(60, 20, x, y));
      }
    }
  }
  for (let obstacleCounter = 0; obstacleCounter < createObstacles.length; obstacleCounter += 1) {
    if (obstacleCounter % 2 === 0) {
      createObstacles[obstacleCounter].x += -1;
      createObstacles[obstacleCounter].move();
    } else {
      createObstacles[obstacleCounter].x += 1;
      createObstacles[obstacleCounter].move();
    }
  }
};

// Create the Game Over Conditions!

// Create the Update Game!

const playFrog = () => {
  frogRoad.clear();
  frogger.newPosition();
  frogger.updateFrog();
  updateObstacles();
};

frogRoad.start();