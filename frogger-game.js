/* eslint-disable default-case */
/* eslint-disable max-classes-per-file */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
console.log('start frog!');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Create the Game Area!

const frogRoad = {
  canvas: document.createElement('canvas'),
  // eslint-disable-next-line func-names
  start: function () {
    this.canvas.width = 700;
    this.canvas.height = 700;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(playFrog, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  // stop: function () {
  //   clearInterval(this.interval);
  // },
  // score: function()
  // restart: function()
  // pause: function()
};

// Create the Frog!

const frog = {
  x: 50,
  y: 50,
  lifes: 3,
  immunity: false,
  moveUp() {
    // this.SpeedY = 50;
    this.y -= 50;
  },
  moveDown() {
    // this.SpeedY = 50;
    this.y += 50;
  },
  moveLeft() {
    // this.Speedx = 50;
    this.x -= 50;
  },
  moveRight() {
    // this.SpeedX = 50;
    this.x += 50;
  },
};

function drawFrog(frog) {
  const img = new Image();
  img.onload = function () {
    context.drawImage(img, frog.x, frog.y, 50, 50);
  };
  img.src = 'https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif';
}

// Create the User Interactions!

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38: // up arrow
      frog.moveUp();
      break;
    case 40: // down arrow
      frog.moveDown();
      break;
    case 37: // left arrow
      frog.moveLeft();
      break;
    case 39: // right arrow
      frog.moveRight();
      break;
  }
  playFrog();
};

// Create the Obstacles!

// class Obstacles {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.SpeedX = 0;
//     this.SpeedY = 0;
//     this.power = true;
//   }

//   // update()

//   // draw()
// }

// Create the Game Over Conditions!

// Create the Update Game!

function playFrog() {
  // frogRoad.start();
  context.clearRect(0, 0, 750, 750);
  // frog.newPosition();
  drawFrog(frog);
  // createLakeSupport();
  // createObstacles();
  // checkGameOver();
}

playFrog();