var counter = 0;

var pause = true;

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

function mouseClicked() {
	if (pause) playPause();
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
