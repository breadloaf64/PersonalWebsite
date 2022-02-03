var embeddedOnWebsite = true;

var sine;

var sequence;
var arr;

var counter = 0;

var period;

var btnPause;
var paused = true;

var currentMouseX = 0;
var currentMouseY = 0;

function preload() {
	preloadSound();
}

function setup() {
	myStandardSetup();
	initialiseSequence();
}

function keyPressed() {
	if (key == ' ' || key == 'p'){ //this means space bar, since it is a space inside of the single quotes
    pauseUnpause();
  }
}

function mousePressed() {
	if (paused) pauseUnpause();
	btnPause.tryClick();
}

function pauseUnpause() {
	paused = ! paused;
	if (paused) {
		sine.stop();
	}
	else {
		sine.loop();
		handleCurrentMouse();
	}
}

function draw() {
	setPlaySpeed();
	handlePlayHead();
	handleEditSequence();
	handleCurrentMouse();
	handleSound();
	render();
	counter++;
}

function handleCurrentMouse() {
	if (!paused) {
		currentMouseX = mouseX;
		currentMouseY = mouseY;
	}
}
