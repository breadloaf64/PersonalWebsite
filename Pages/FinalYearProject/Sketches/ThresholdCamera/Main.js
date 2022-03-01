var poster;
var takingPhoto = true;
var thresholdVal;

var FlipCamera;
var buttonPressedThisFrame = false;

// canvas and capture size
var w = 400;
var h = 400;

function setup() {
	myStandardSetup();
	setupCapture();
	makeFlipCameraButton();
}

function makeFlipCameraButton() {
	let btnHeight = height * 0.04;
	let btnWidth = btnHeight * 7/2;
	let text = "flip";
	btnFlipCamera = new Button(width - btnWidth - 20, height - btnHeight - 20, btnWidth, btnHeight, flipCamera, text,
														 colFlipCameraButtonFill, colFlipCameraButtonBorder, colFlipCameraButtonText);
}

function draw() {
	render();
	buttonPressedThisFrame = false;
}

function mouseClicked() {
	if (embeddedOnWebsite && (mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)) {
		// if on a website, don't register the click if it's off the sketch
		return;
	}
	
	btnFlipCamera.tryClick();
	
	if (takingPhoto && !buttonPressedThisFrame) takePhoto();
	else takingPhoto = true;
}

function takePhoto() {
	thresholdVal = map(mouseY, height, 0, 0, 100);
	poster = thresholdFilter(capture.get(0, 0, w, h));
	takingPhoto = false;
	print("converted");
}