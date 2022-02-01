var counter = 0;

var pause = false;

var currentMouseX = 0;
var currentMouseY = 0;

function preload() {
	preloadSound();
}

function setup() {
	myStandardSetup();
	setupSound();
}

function keyPressed() {
	if (key == ' '){ //this means space bar, since it is a space inside of the single quotes
    playPause();
  }

  // stops page from scrolling
  return false;
}

function playPause() {
	pause = ! pause;
	if (pause) {
		sine.stop();
	}
	else {
		sine.loop();
	}
}

function draw() {
	handleCurrentMouse();
	handleSound();
	render();
	counter++;

	strokeWeight(1);
	fill(255, 0, 0);
	stroke(255, 0, 0);
	text("window.innerWidth: " + window.innerWidth, 40, 100);
    text("window.innerHeight: " + window.innerHeight, 40, 150);
	text("width: " + width, 40, 200);
	text("Height: " + height, 40, 250);
}

function handleCurrentMouse() {
	if (!pause) {
		currentMouseX = mouseX;
		currentMouseY = mouseY;
	}
}

function render() {
	background(colBackground);
	drawGrid();
	drawWave();
	drawCrosshair();
	drawReadouts();
	drawPauseScreen();
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}
