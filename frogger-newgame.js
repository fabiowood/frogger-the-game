/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable max-len */
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
  borders: function () {
    const borderUp = frogger.y < -12;
    const borderDown = frogger.y > this.canvas.height + 10;
    const borderLeft = frogger.x < -12;
    const borderRight = frogger.x > this.canvas.width + 10;
    return (borderUp || borderDown || borderLeft || borderRight);
  },
  // score: function ()
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
    frogRoad.context.fillStyle = 'red';
    frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  crashWith(RoadObstacles) {
    return !(
      this.bottom() < RoadObstacles.top() ||
      this.top() > RoadObstacles.bottom() ||
      this.right() < RoadObstacles.left() ||
      this.left() > RoadObstacles.right()
    );
  }
}

const frogger = new Frog(30, 30, 600, 560);

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

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }
}

const updateObstacles = () => {
  frogRoad.frames += 1;
  let y = frogRoad.canvas.height;
  if (frogRoad.frames % 120 === 0) {
    for (let roadCounter = 0; roadCounter < 7; roadCounter += 1) {
      if (roadCounter % 2 === 0) {
        y -= 80;
        createObstacles.push(new RoadObstacles(60, 20, 1200, y));
      } else {
        y -= 80;
        createObstacles.push(new RoadObstacles(60, 20, -60, y));
      }
    }
  }
  for (let obstacleCounter = 0; obstacleCounter < createObstacles.length; obstacleCounter += 1) {
    if (obstacleCounter % 2 === 0) {
      createObstacles[obstacleCounter].x += 1;
      createObstacles[obstacleCounter].move();
    } else {
      createObstacles[obstacleCounter].x -= 1;
      createObstacles[obstacleCounter].move();
    }
  }
};

// Check Phase Completion and Change Level!

// Create the Game Over Conditions! - Check if it is an Obstacle!

const checkGameOver = () => {
  const collideWithObstacles = createObstacles.some((RoadObstacles) => frogger.crashWith(RoadObstacles));
  const collideWithBorders = frogRoad.borders();
  if (collideWithObstacles || collideWithBorders) {
    frogRoad.stop();
    if (frogger.lifes > 0) {
      const returnToBeginnning = () => {
        console.log('try again');
        alert('try again!');
        frogger.lifes -= 1;
        frogger.x = 600;
        frogger.y = 560;
        frogRoad.context.fillStyle = 'red';
        frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
        const tryAgain = setTimeout(frogRoad.start(), 2000);
        document.onkeyup();
        return tryAgain;
      };
      returnToBeginnning();
    } else {
      console.log('game over!');
      alert('game over for this frog!');
    }
  }
};

// Create the Update Game!

const playFrog = () => {
  frogRoad.clear();
  frogger.newPosition();
  frogger.updateFrog();
  updateObstacles();
  checkGameOver();
};

frogRoad.start();