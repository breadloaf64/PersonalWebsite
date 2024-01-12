var embeddedOnWebsite = true; // changing this to true will put it inside of the div called sketch-holder

var counter = 0;

var currentMouseX = 0;
var currentMouseY = 0;

var btnPause;
var paused = true;

function preload() {
  preloadSound();
}

function setup() {
  myStandardSetup();
  setupSound();
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
    sine.loop();
  } else {
    sine.stop();
  }
}

function mouseClicked() {
  if (
    embeddedOnWebsite &&
    (mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)
  ) {
    // if on a website, don't register the click if it's off the sketch
    return;
  }

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
  handleSound();
  handleCurrentMouse();
  render();
  counter++;
}
