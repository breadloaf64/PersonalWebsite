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
	poster = recolourFromBlackWhite(poster);
	takingPhoto = false;
	print("converted");
}

function recolourFromBlackWhite(img) {
	img.loadPixels();
	
	let outImg = createImage(img.width, height);
	outImg.loadPixels();
	
	for (let i = 0; i < outImg.pixels.length; i += 4) {
	  if (img.pixels[i] == 0) {
			outImg.pixels[i + 0] = red(colDark);
			outImg.pixels[i + 1] = green(colDark);
			outImg.pixels[i + 2] = blue(colDark);
			outImg.pixels[i + 3] = alpha(colDark);
		}
		else {
			outImg.pixels[i + 0] = red(colBright);
			outImg.pixels[i + 1] = green(colBright);
			outImg.pixels[i + 2] = blue(colBright);
			outImg.pixels[i + 3] = alpha(colBright);
		}
		
	}
	
	outImg.updatePixels();
	return outImg;
}