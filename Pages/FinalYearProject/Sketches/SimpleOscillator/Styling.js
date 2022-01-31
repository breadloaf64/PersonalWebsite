var imgNoiseTexture;

var colFrame;
var colBackground;
var colReadouts;
var colCrosshair;
var colWave;
var colGrid;

function setColours() {
	colFrame = color("#2f3e46");
	colBackground = color("#354f52");
	colReadouts = color("#84a98c");
	colCrosshair = color("#84a98c");
	colWave = color("#cad2c5");
	colGrid = color("#52796f");
}

function setNoiseTexture() {
	let amount = 0.2;
	let img = createImage(int(width), int(height));
	img.loadPixels();
	for (let i = 0; i < img.width; i++) {
		for (let j = 0; j < img.height; j++) {
			if (random(1) < amount) {
				img.set(i, j, color(random(255), 15));
			} else {
				img.set(i, j, color(0, 0));
			}
		}
	}
	img.updatePixels();
	imgNoiseTexture = img;
}

function drawFrame() {
	strokeWeight(30);
	stroke(colFrame);
	noFill();
	rect(0, 0, width, height);
}

function myStandardSetup() {
	setCanvas();
	createMetaTag();
	setColours();
	setNoiseTexture();
}

function setCanvas() {
	// set this to true if you want the standard square sketch size
	let forceSquare = true;

	if (forceSquare) {
		size = min(window.innerWidth, window.innerHeight) * 0.8;
		print("window.innerWidth: " + window.innerWidth);
		print("window.innerHeight: " + window.innerHeight);
		print("size: " + size);
		createCanvas(size, size);
	}
	else {
		createCanvas(window.innerWidth, window.innerHeight);
	}
}

function touchMoved() {
  // prevent the display from moving around when you touch it
  return false;
}

function createMetaTag() {
	let meta = createElement('meta');
	meta.attribute('name', 'viewport');
	meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

	let head = select('head');
	meta.parent(head);
}
