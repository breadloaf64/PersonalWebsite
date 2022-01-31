var imgNoiseTexture;

var colFrame;
var colBackground;
var colSnake;
var colHead;
var colApple;

function setColours() {
	colFrame = color("#827081");
	colBackground = color("#e7e6f7");
	colSnake = color("#aea3b0");
	colHead = color("#827081");
	colApple = color("#e3d0d8");
	colGameOver = color("#FAF1DB");
	colGameOver.setAlpha(100);
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
	setColours();
	setNoiseTexture();
}

function setCanvas() {
	// set this to true if you want the standard square sketch size
	let forceSquare = true;
	
	if (forceSquare) {
		size = min(windowWidth, windowHeight) * 0.8;
		createCanvas(size, size);
	}
	else {
		createCanvas(windowWidth, windowHeight);
	}
}