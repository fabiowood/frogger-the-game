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
    this.interval = setInterval(playFrog, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  borders: function () {
    const borderUp = frogger.y < -12;
    const borderDown = frogger.y > this.canvas.height + 12;
    const borderLeft = frogger.x < -12;
    const borderRight = frogger.x > this.canvas.width + 12;
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

const frogger = new Frog(25, 25, 600, 575);

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
    case 32: // spacebar
      frogState = !frogState;
      frogger.speedY -= 9;
      setTimeout(() => {
        frogState = !frogState;
      }, 100);
      break;
    case 90: // key: z
      frogState = !frogState;
      frogger.speedY += 9;
      setTimeout(() => {
        frogState = !frogState;
      }, 100);
      break;
  }
};

// eslint-disable-next-line no-unused-vars
document.onkeyup = (e) => {
  frogger.speedX = 0;
  frogger.speedY = 0;
};

// Create the Obstacles! Create the Lake Objects!

const createObstacles = [];

const createLakeObjects = [];

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

  moveLakeObjects() {
    frogRoad.context.fillStyle = 'blue';
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
  let yObs = frogRoad.canvas.height;
  let y = frogRoad.canvas.height - frogger.height - 300;
  if (frogRoad.frames % 100 === 0) {
    for (let roadCounter = 0; roadCounter < 5; roadCounter += 1) {
      if (roadCounter % 2 === 0) {
        yObs -= 62;
        createObstacles.push(new RoadObstacles(60, 20, 1200, yObs));
      } else {
        yObs -= 62;
        createObstacles.push(new RoadObstacles(60, 20, -60, yObs));
      }
    }
    for (let lakeCounter = 0; lakeCounter < 3; lakeCounter += 1) {
      if (lakeCounter % 2 === 0) {
        y -= 60;
        createLakeObjects.push(new RoadObstacles(60, 20, -60, y));
      } else {
        y -= 60;
        createLakeObjects.push(new RoadObstacles(60, 20, 1200, y));
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
  for (let lakeObsCounter = 0; lakeObsCounter < createLakeObjects.length; lakeObsCounter += 1) {
    if (lakeObsCounter % 2 === 0) {
      createLakeObjects[lakeObsCounter].x += 1;
      createLakeObjects[lakeObsCounter].moveLakeObjects();
    } else {
      createLakeObjects[lakeObsCounter].x -= 1;
      createLakeObjects[lakeObsCounter].moveLakeObjects();
    }
  }
};

// Check Phase Completion and Change Level!

const createBoxes = [];

// Create the Game Over Conditions! - Check if it is an Obstacle!

let frogState = true;

const checkJumpToObject = () => {
  if (frogState) {
    createLakeObjects.some((wood) => {
      if (frogger.crashWith(wood)) {
        frogger.y = wood.y;
        frogger.x = wood.x; // else {
        //   frogRoad.stop();
        //   if (frogger.lifes > 0) {
        //     const returnToBeginnning = () => {
        //       console.log('try again');
        //       alert('try again!');
        //       frogger.lifes -= 1;
        //       frogger.x = 600;
        //       frogger.y = 560;
        //       frogRoad.context.fillStyle = 'red';
        //       frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
        //       const tryAgain = setTimeout(frogRoad.start(), 2000);
        //       document.onkeyup();
        //       return tryAgain;
        //     };
        //     returnToBeginnning();
        //   } else {
        //     console.log('game over!');
        //     alert('game over for this frog!');
        //   }
        // }
      }
    });
  }
};

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
  checkJumpToObject();
  checkGameOver();
};

frogRoad.start();