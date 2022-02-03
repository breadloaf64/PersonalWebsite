var playHeadPos = 0;
var playSpeed = 1;
var minPlaySpeed = -10;
var maxPlaySpeed = 10;

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

		if (mouseIsPressed) {
			if (mouseX == currentMouseX && mouseY == currentMouseY) {
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
}

function setPlaySpeed() {
	if (isMobile) {
		playSpeed = map(gyroGamma, -90, 90, minPlaySpeed, maxPlaySpeed);
	}
	else {
		playSpeed = map(mouseX, 0, width, minPlaySpeed, maxPlaySpeed);
	}
}