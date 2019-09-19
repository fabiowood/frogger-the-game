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
    const borderUp = frogger.y < -10;
    const borderDown = frogger.y > this.canvas.height + 10;
    const borderLeft = frogger.x < -10;
    const borderRight = frogger.x > this.canvas.width + 10;
    return (borderUp || borderDown || borderLeft || borderRight);
  },
  level: 1,
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

const frogger = new Frog(50, 25, 600, 575);

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
      sinkInWater = !sinkInWater;
      setTimeout(() => {
        sinkInWater = !sinkInWater;
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
  let yLakeObject = frogRoad.canvas.height - 350;
  if (frogRoad.frames % 110 === 0) {
    for (let roadCounter = 0; roadCounter < 3; roadCounter += 1) {
      if (roadCounter % 2 === 0) {
        yObs -= 80;
        createObstacles.push(new RoadObstacles(60, 20, 1200, yObs));
      } else {
        yObs -= 80;
        createObstacles.push(new RoadObstacles(60, 20, -60, yObs));
      }
    }
    for (let lakeCounter = 0; lakeCounter < 3; lakeCounter += 1) {
      if (lakeCounter % 2 === 0) {
        yLakeObject -= 55;
        createLakeObjects.push(new RoadObstacles(60, 20, -60, yLakeObject));
      } else {
        yLakeObject -= 55;
        createLakeObjects.push(new RoadObstacles(60, 20, 1200, yLakeObject));
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

const createBoxes = []; // fixed boxes inside the FrogRoad Area

const boxBoundaries = []; // walls between boxes

const notAllowedBoxes = []; // array with boxes already filled by the player

class Boxes {
  constructor(width, height, x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

const drawBoxes = () => {
  this.width = 135;
  this.height = 60;
  this.x = 110;
  this.y = 0;
  for (let boxCounter = 0; boxCounter < 4; boxCounter += 1) {
    if (boxCounter === 0) {
      createBoxes.push(new Boxes(this.width, this.height, 0, this.y));
      boxBoundaries.push(new Boxes(this.x, this.y, this.width, this.height));
      frogRoad.context.fillStyle = 'green';
      frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.x += this.width * 2;
      createBoxes.push(new Boxes(this.width, this.height, this.x - this.width, 0));
      boxBoundaries.push(new Boxes(this.x, this.y, this.width, this.height));
      frogRoad.context.fillStyle = 'green';
      frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
};

const checkWin = () => {
  let targetBoxes = 0;
  const fillBoxes = createBoxes.some((box) => (frogger.y <= box.height) && (frogger.x > box.x && frogger.x < box.x + box.width));
  if (fillBoxes) {
    const returnToBeginning = () => {
      targetBoxes += 1;
      notAllowedBoxes.push(new Boxes(100, 60, frogger.x, frogger.y));
      if (targetBoxes === 5) {
        console.log('Well Done! Go To Next Level!');
        alert('Well Done! Go To Next Level!');
        frogger.x = 600;
        frogger.y = 560;
        const goNextLevel = setTimeout(frogRoad.start(), 2000);
        document.onkeyup();
        return goNextLevel;
      }
      console.log('good job');
      alert('good job!');
      frogger.x = 600;
      frogger.y = 560;
      frogRoad.context.fillStyle = 'red';
      frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
      const fillAnotherBox = setTimeout(frogRoad.start(), 2000);
      document.onkeyup();
      return fillAnotherBox;
    };
    returnToBeginning();
  }
};

// Create the Game Over Conditions! - Check if it is an Obstacle!

let frogState = true;

let sinkInWater = true;

const checkJumpToObject = () => {
  if (frogState) {
    createLakeObjects.some((wood) => {
      if (frogger.crashWith(wood)) {
        frogger.y = wood.y;
        frogger.x = wood.x;
      }
    });
  }
};

const checkGameOver = () => {
  const collideWithObstacles = createObstacles.some((RoadObstacles) => frogger.crashWith(RoadObstacles));
  const collideWithBorders = frogRoad.borders();
  const collideWithFilledBoxes = notAllowedBoxes.some((box) => (frogger.y <= box.y) && (frogger.x >= box.x) && (frogger.x <= box.x + box.width));
  const collideBetweenBoxes = boxBoundaries.some((boundary) => (frogger.y <= boundary.y) && (frogger.x >= boundary.x) && (frogger.x <= boundary.x + boundary.width));
  // let collideBetweenBoxes = false;
  // const collideToBoxBoundaries = () => {
  //   if ((frogger.y <= 60) && ((frogger.x >= 110 && frogger.x <= 245) || (frogger.x >= 380 && frogger.x <= 515) || (frogger.x >= 650 && frogger.x <= 785) || (frogger.x >= 920 && frogger.x <= 1055))) {
  //     collideBetweenBoxes = true;
  //   }
  //   return collideBetweenBoxes;
  // };
  // if (sinkInWater) {
  //   const drownInWater = createLakeObjects.some((lakeobject) => !frogger.crashWith(lakeobject) && frogger.y < frogRoad.canvas.height - 350);
  // }
  if (collideWithObstacles || collideWithBorders || collideBetweenBoxes /* || collideWithFilledBoxes */ ) {
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
      document.onkeyup();
    }
  }
};

// Create the Update Game!

const playFrog = () => {
  frogRoad.clear();
  frogger.newPosition();
  frogger.updateFrog();
  drawBoxes();
  updateObstacles();
  checkJumpToObject();
  checkWin();
  checkGameOver();
};

frogRoad.start();