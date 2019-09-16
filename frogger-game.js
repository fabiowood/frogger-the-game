/* eslint-disable func-names */
/* eslint-disable object-shorthand */
console.log('start frogger!');


// Create the Game Area!

const frogRoad = {
  canvas: document.createElement('canvas'),
  // eslint-disable-next-line func-names
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateFrogRoad, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
}

// Create the Frog!

class 

// Draw the Board!

// Create the User Interactions!

// Create the Obstacles!

// Create the Game Over Conditions!

// Create the Update Game!