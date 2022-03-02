var FlipCamera;
var buttonPressedThisFrame = false;

var filterSelection = 0;
var filterNames = ["None", "Threshold", "Gray", "Invert", "Posterize", "Blur", "Erode", "Dilate"];

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

	if (!buttonPressedThisFrame) {
		filterSelection++;
		if (filterSelection >= 8) filterSelection = 0;
	}
}
