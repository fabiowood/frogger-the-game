/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable default-case */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

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
    this.interval = setInterval(playFrog, 30);
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
  gameLevel: 1,
  // score: function () {
  //   let totalPoints = 0;
  //   this.context.font = '18px serif';
  //   this.context.fillStyle = 'blue';
  //   this.context.fillText(`Score: ${totalPoints}!`, 0, 570);
  //   return totalPoints;
  // },
  // restart: function()
  // pause: function()
};

// Draw The Board!

const drawBoard = () => {
  const lakeImage = new Image();
  lakeImage.src = './images/lake-water-2.jpg';
  frogRoad.context.drawImage(lakeImage, 0, 0, 1200, 230);
  const sandImage = new Image();
  sandImage.src = './images/sand.jpg';
  frogRoad.context.drawImage(sandImage, 0, 230, 1200, 40);
  const highwayImage = new Image();
  highwayImage.src = './images/highway-2.jpg';
  frogRoad.context.drawImage(highwayImage, 0, 270, 1200, 280);
  const sideWalkImage = new Image();
  sideWalkImage.src = './images/sidewalk.jpg';
  frogRoad.context.drawImage(sideWalkImage, 0, 550, 1200, 50);
};

// Draw Target Boxes to Frog!

const createBoxes = []; // fixed boxes inside the FrogRoad Area

const boxBoundaries = []; // walls between boxes

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
      const rockImage = new Image();
      rockImage.src = './images/rocks.jpg';
      frogRoad.context.drawImage(rockImage, this.x, this.y, this.width, this.height);
      // frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.x += this.width * 2;
      createBoxes.push(new Boxes(this.width, this.height, this.x - this.width, 0));
      boxBoundaries.push(new Boxes(this.x, this.y, this.width, this.height));
      const rockImage = new Image();
      rockImage.src = './images/rocks.jpg';
      frogRoad.context.drawImage(rockImage, this.x, this.y, this.width, this.height);
      // frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
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
    const froggerImage = new Image();
    froggerImage.src = './images/frogger.png';
    frogRoad.context.drawImage(froggerImage, this.x, this.y, this.width, this.height);
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

  crashWater(lakeobject) {
    return (
      this.top() > lakeobject.bottom() &&
      this.bottom() < lakeobject.top() &&
      this.left() > lakeobject.right() &&
      this.right < lakeobject.left()
    );
  }
}

const frogger = new Frog(30, 30, 600, 560);

// Create the User Interactions!

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38: // up arrow
      if (frogger.y < frogRoad.canvas.height - 365) {
        frogger.speedY = 0;
      } else {
        frogger.speedY -= 8;
      }
      break;
    case 40: // down arrow
      if (frogger.y < frogRoad.canvas.height - 400) {
        frogger.speedY = 0;
      } else {
        frogger.speedY += 8;
      }
      break;
    case 37: // left arrow
      if (frogger.y < frogRoad.canvas.height - 400) {
        frogger.speedX = 0;
      } else {
        frogger.speedX = -8;
      }
      break;
    case 39: // right arrow
      if (frogger.y < frogRoad.canvas.height - 400) {
        frogger.speedX = 0;
      } else {
        frogger.speedX = 8;
      }
      break;
    case 32: // spacebar
      drownInWater = false;
      sinkInWater = false;
      frogState = !frogState;
      frogger.speedY = -8;
      setTimeout(() => {
        frogState = !frogState;
      }, 100);
      setTimeout(() => {
        sinkInWater = !sinkInWater;
      }, 500);
      break;
    case 90: // key: z
      drownInWater = false;
      sinkInWater = false;
      frogState = !frogState;
      frogger.speedY = 9;
      setTimeout(() => {
        frogState = !frogState;
      }, 100);
      setTimeout(() => {
        sinkInWater = !sinkInWater;
      }, 500);
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
    const carImage = new Image();
    carImage.src = './images/ford-mustang.png';
    frogRoad.context.drawImage(carImage, this.x, this.y, this.width, this.height);
    // frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLakeObjects() {
    const crocImage = new Image();
    crocImage.src = './images/crocodiles.png';
    frogRoad.context.drawImage(crocImage, this.x, this.y, this.width, this.height);
    // frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
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
  let yLakeObject = frogRoad.canvas.height - 370;
  if (frogRoad.frames % 120 === 0) {
    for (let roadCounter = 0; roadCounter < 5; roadCounter += 1) {
      if (roadCounter % 2 === 0) {
        yObs -= 85;
        createObstacles.push(new RoadObstacles(50, 25, 1200, yObs));
      } else {
        yObs -= 65;
        createObstacles.push(new RoadObstacles(50, 25, -60, yObs));
      }
    }
    for (let lakeCounter = 0; lakeCounter < 3; lakeCounter += 1) {
      if (lakeCounter % 2 === 0) {
        yLakeObject -= 50;
        createLakeObjects.push(new RoadObstacles(60, 30, -60, yLakeObject));
      } else {
        yLakeObject -= 50;
        createLakeObjects.push(new RoadObstacles(60, 30, 1200, yLakeObject));
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

let targetBoxes = 0;

const notAllowedBoxes = []; // array with boxes already filled by the player

const checkWin = () => {
  const fillBoxes = createBoxes.some((box) => (frogger.y <= box.height) && ((frogger.x > box.x && frogger.x < box.x + box.width) || (frogger.x > 1055 && frogger.x < frogRoad.canvas.width)));
  if (fillBoxes) {
    targetBoxes += 1;
    const winnerFrogImage = new Image();
    winnerFrogImage.src = './images/happy-frog.png';
    frogRoad.context.drawImage(winnerFrogImage, frogger.x, frogger.y, 100, 20);
    // frogRoad.totalPoints += 500;
    notAllowedBoxes.push(new Boxes(270, 30, frogger.x - 135, 40));
    if (targetBoxes === 5) {
      console.log('Well Done! Go To Next Level!');
      alert('Well Done! Go To Next Level!');
      frogRoad.totalPoints += 5000;
      frogRoad.gameLevel += 1;
      targetBoxes = 0;
      frogger.x = 600;
      frogger.y = 560;
      document.onkeyup();
    } else {
      console.log('good job');
      alert('good job!');
      frogger.x = 600;
      frogger.y = 560;
      frogRoad.context.fillStyle = 'red';
      frogRoad.context.fillRect(this.x, this.y, this.width, this.height);
      document.onkeyup();
    }
  }
};

// Create the Game Over Conditions! - Check if it is an Obstacle or the Lake Water!

let frogState = true;

let sinkInWater = false;

const checkJumpToObject = () => {
  if (frogState) {
    createLakeObjects.some((wood) => {
      if (frogger.crashWith(wood)) {
        frogger.y = wood.y;
        frogger.x = wood.x;
        sinkInWater = false;
      }
    });
  }
};

let drownInWater = false;

const checkGameOver = () => {
  const collideWithObstacles = createObstacles.some((RoadObstacles) => frogger.crashWith(RoadObstacles));
  const collideWithBorders = frogRoad.borders();
  const collideWithFilledBoxes = notAllowedBoxes.some((box) => (frogger.y <= box.y + box.height) && (frogger.x > box.x) && (frogger.x < box.x + box.width));
  const collideBetweenBoxes = boxBoundaries.some((boundary) => (frogger.y < boundary.y - 10) && (frogger.x > boundary.x) && (frogger.x < boundary.x + boundary.width));
  if (sinkInWater) {
    drownInWater = createLakeObjects.some((lakeobject) => !frogger.crashWater(lakeobject) && frogger.y < frogRoad.canvas.height - 375);
  }
  if (collideWithObstacles || collideWithBorders || collideBetweenBoxes || drownInWater || collideWithFilledBoxes) {
    frogRoad.stop();
    if (frogger.lifes > 0) {
      console.log('try again');
      alert('try again!');
      frogger.lifes -= 1;
      frogger.x = 600;
      frogger.y = 560;
      setTimeout(frogRoad.start(), 2000);
      document.onkeyup();
    } else {
      console.log('game over!');
      alert('game over for this frog!');
      setTimeout(() => location.reload(), 3000);
      // setTimeout(frogRoad.start(), 2000);
      document.onkeyup();
    }
  }
};

// Play The Game!

// const bodySong = document.getElementsByTagName('body');
// bodySong.addEventListener('load', insertAudioName.play());

const startGame = () => {
  const startButton = document.getElementById('start-game');
  frogRoad.start();
  startButton.style.display = 'none';
  // bodySong.pause();
  // newAudio.play();
};

const playFrog = () => {
  frogRoad.clear();
  drawBoard();
  drawBoxes();
  updateObstacles();
  frogger.newPosition();
  frogger.updateFrog();
  checkJumpToObject();
  checkWin();
  // frogRoad.score();
  checkGameOver();
};