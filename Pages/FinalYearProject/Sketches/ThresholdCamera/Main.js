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
	if (embeddedOnWebsite && (mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)) {
		// if on a website, don't register the click if it's off the sketch
		return;
	}

	if (takingPhoto) takePhoto();
	else takingPhoto = true;
}

function takePhoto() {
	thresholdVal = map(mouseY, height, 0, 0, 100);
	poster = thresholdFilter(capture.get(0, 0, w, h));
	takingPhoto = false;
	print("converted");
}
