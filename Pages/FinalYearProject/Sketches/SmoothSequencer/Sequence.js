var playHeadPos = 0;
var playSpeed = 1;
var minPlaySpeed = -10;
var maxPlaySpeed = 10;

var sequence; // array that holds all a value for all x values. This value will be mapped to a pitch.

function initialiseSequence() {
	// The sequence is an array that holds a y value height for each x value along. This will be used to determine the pitch
	sequence = [];
	for (let i = 0; i < width; i++) {
		sequence.push(height / 2);
	}
}

function handlePlayHead() {
	if (!paused) {
		playHeadPos += playSpeed;
		if (round(playHeadPos) >= width) playHeadPos -= width;
		else if (round(playHeadPos) < 0) playHeadPos += width;
	}
}

function handleEditSequence() {
	if (!paused) {
		let ml = createVector(mouseX, mouseY);
		let mr = createVector(currentMouseX, currentMouseY);

		if (mr.x < ml.x) {
			let temp = mr.copy();
			mr = ml.copy();
			ml = temp.copy();
		}

		if (mouseIsPressed && prevMouseIsPressed) { // this is so that on touch screen, if the user puts their finger down, there won't be a line between the position and previous position.
			if (mouseX == currentMouseX && mouseY == currentMouseY) { // yeah, this double if is dodgy, I know. But I think it's omre readable
				// do nothing if the mouse hadn't moved
			}
			else {
				// interpolate between mouse's last position and current position to draw smooth curve
				for (let i = round(ml.x); i <= round(mr.x); i++) {
					sequence[i] = round(ml.y + (mr.y - ml.y) * (i - ml.x) / (mr.x - ml.x));
				}
			}
		}
	}
	prevMouseIsPressed = mouseIsPressed;
}

function setPlaySpeed() {
	if (isMobile) {
		playSpeed = map(gyroGamma, -70, 90, minPlaySpeed * 2, maxPlaySpeed * 2, true);
	}
	else {
		playSpeed = map(mouseX, 0, width, minPlaySpeed, maxPlaySpeed);
	}
}