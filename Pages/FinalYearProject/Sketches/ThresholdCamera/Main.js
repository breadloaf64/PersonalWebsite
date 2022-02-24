var poster;
var takingPhoto = true;
var thresholdVal;

// canvas and capture size
var w = 400;
var h = 400;

function setup() {
	myStandardSetup();
	setupCapture();
}

function draw() {
	render();
}

function mouseClicked() {
	if (takingPhoto) takePhoto();
	else takingPhoto = true;
}

function takePhoto() {
	poster = thresholdFilter(capture.get(0, 0, w, h));
	thresholdVal = map(mouseY, height, 0, 0, 100);
	takingPhoto = false;
	print("converted");
}