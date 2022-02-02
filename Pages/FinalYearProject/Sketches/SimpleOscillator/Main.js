var embeddedOnWebsite = true; // changing this to true will put it inside of the div called sketch-holder

var counter = 0;

var begin = true;

var currentMouseX = 0;
var currentMouseY = 0;

var btnMute;

function preload() {
	preloadSound();
}

function setup() {
	myStandardSetup();
	setupSound();
	makeMuteButton();
}

function keyPressed() {
	if (key == ' ' || key == 'm'){ //this means space bar, since it is a space inside of the single quotes
    muteUnmute();
  }
}

function mouseClicked() {
	if (begin) beginSketch();
	btnMute.tryClick();
}

function beginSketch() {
	begin = false;
	muteUnmute();
}

function draw() {
	handleSound();
	render();
	counter++;
}

function render() {
	background(colBackground);
	drawGrid();
	drawWave();
	drawCrosshair();
	drawButton();
	drawReadouts();
	drawBeginScreen();
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}
