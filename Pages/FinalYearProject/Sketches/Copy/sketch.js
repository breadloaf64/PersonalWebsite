var alpha, beta, gamma;
var xpos, ypos;

function setup()
{
  // set canvas size
  var myCanvas = createCanvas(400, 400);
  myCanvas.parent('sketch');

  // default values
  xpos = 200;
  ypos = 200;
  alpha = 0;
  beta = 0;
  gamma = 0;
}

function draw()
{
  // set background color to white
  background(255);

  // display variables
  fill(100);
  noStroke();
  text("alpha: " + alpha, 25, 25);
  text("beta: " + beta, 25, 50);
  fill(255, 0, 0);
  text("gamma: " + gamma, 25, 75);

  push();
  translate(200, 200);
  rotate(radians(gamma));
  fill(255, 0, 0);
  rect(-40, -40, 80, 80);
  fill(0);
  rect(-40, 40, 80, 5);
  pop();
}

// accelerometer Data
window.addEventListener('deviceorientation', function(e)
{
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});
