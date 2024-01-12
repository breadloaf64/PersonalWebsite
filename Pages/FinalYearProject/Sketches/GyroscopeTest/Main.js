var counter = 0;

var currentMouseX = 0;
var currentMouseY = 0;

var btnPause;
var paused = true;

function preload() {}

function setup() {
  myStandardSetup();
  makePauseButton();
}

function keyPressed() {
  if (key == " " || key == "p") {
    //spacebar or p to pause/unpause
    pauseUnpause();
  }
  return false;
}

function pauseUnpause() {
  paused = !paused;
  if (!paused) {
  } else {
  }
}

function mouseClicked() {
  if (paused) pauseUnpause();
  btnPause.tryClick();
}

function handleCurrentMouse() {
  if (!paused) {
    currentMouseX = mouseX;
    currentMouseY = mouseY;
  }
}

function draw() {
  handleCurrentMouse();
  render();
  counter++;
}
