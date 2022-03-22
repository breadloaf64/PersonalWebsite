function preload() {
	img = loadImage("wilhelm image.jpg");
	sound = loadSound("wilhelm sound.wav");
}

function setup() {
	myStandardSetup();
	makeimgSquare();
	makeButtons();
}

function makeButtons() {
	makePauseButton();
}

var buttonPressedThisFrame = false;
function makePauseButton() {
	const txtSize = width / 30;
	const typeface = "monospace";
	const text = " pause ";

	textFont(typeface, txtSize);

	const btnHeight = txtSize * 1.1;
	const btnWidth = textWidth(text) * 1.1;

	const buttonPressFunction = function() {
		buttonPressedThisFrame = true;
		pauseUnpause();
	}

	btnPause = new Button(width - btnWidth - 20, height - btnHeight - 20, btnWidth, btnHeight,
														 buttonPressFunction, text, txtSize, typeface,
														colButtonFill, colButtonBorder, colButtonText);
}

var paused = true;
function pauseUnpause() {
	paused = !paused;
	if (paused) {

	}
	else {
		sound.stop();
	}
}

function makeimgSquare() {
	let h = img.height;
	let w = img.width;
	let l = min(h, w);

	img = img.get((img.width - l) / 2, (img.height - l) / 2, l, l);
}

function draw() {
	handleSound();
	render();
	setParameters();
	buttonPressedThisFrame = false;
}

function setParameters() {
	if (!buttonPressedThisFrame && !paused && mouseIsPressed) {
		meanPeriod = map(mouseY, height, 0, 1, 60);
		variance = map(mouseX, 0, width, 1, 20);
		if (variance > meanPeriod / 2) {
			variance = meanPeriod / 2;
		}
	}

}

function mouseClicked() {
	btnPause.tryClick();
	if (!buttonPressedThisFrame) {
		if (paused) {
			pauseUnpause();
		}
		else {
			scream();
		}
	}
}

function render() {
	background(255);
	image(img, 0, 0, width, height);
	btnPause.draw();
	drawReadouts();
	drawPauseScreen()
	drawFrame();
	image(imgNoiseTexture, 0, 0, width, height);
}

function drawReadouts() {
	if (!paused) {
		// textbox background
		fill(255, 150);
		rect(70, 70, width / 2, height /2);

		// font formatting
		fill(colReadouts);
		noStroke();
		txtSize = width / 30;
		textFont("monospace", txtSize);

		text("meanPeriod: " + nf(meanPeriod, 4, 2), 100, 100);
		text("variance: " + nf(variance, 4, 2), 100, 100 + 2 * txtSize);
		text("countdown: " + nf(secondsUntilScream, 4, 2), 100, 100 + 4 * txtSize);
	}
}

var secondsUntilScream = 1;
var meanPeriod = 10;
var variance = 5;

function handleSound() {
	if (!paused) {
		secondsUntilScream -= deltaTime / 1000;
	}
	if (secondsUntilScream <= 0) {
		scream();
	}
}

function scream() {
	sound.play();
	secondsUntilScream = map(random(1), 0, 1, meanPeriod - variance / 2, meanPeriod + variance / 2);
}
