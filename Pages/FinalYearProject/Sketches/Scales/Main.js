var counter = 0;

var btnPause;
var paused = true;

var btnArrScaleDegrees;

function preload() {
	preloadSound();
}

function setup() {
	myStandardSetup();
	makePauseButton();
	setupSound();
	setupScaleDegreesButtons();
}

function setupScaleDegreesButtons() {

	btnArrScaleDegrees = new RectToggleButtonArray(0, 0, 200, 100, 1, 12, false, false); // x y w and h are placeholders here
	btnArrScaleDegrees.setText(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);
	setSizeScaleDegreesButtons();
}

function setSizeScaleDegreesButtons() {
	let w = 0.86 * width;
	let h = height / 7;
	let x = (width - w) / 2;
	let y = height * 0.38;

	btnArrScaleDegrees.setSize(x, y, w, h);
}

function keyPressed() {
	if (key == ' ' || key == 'p'){ //spacebar or p to pause/unpause
    pauseUnpause();
  }
	return false;
}

function mouseClicked() {
	if (embeddedOnWebsite && (mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)) {
		// if on a website, don't register the click if it's off the sketch
		return;
	}
	
	if (paused) pauseUnpause();
	else {
		btnPause.tryClick();
		btnArrScaleDegrees.tryClick();
		updateScale();
	}
}

function updateScale() {
	let tonic = 3;

	// get scale degrees from degree button array
	let degrees = []
	let index = 0;

	for (let row of btnArrScaleDegrees.buttons) {
		for (let b of row) {
			if (b.state) {
				degrees.push(index);
			}
			index++;
		}
	}

	userScale = new Scale(tonic, degrees);
}

function pauseUnpause() {
	paused = ! paused;
	if (paused) {
		wave.stop();
	}
	else {
		wave.loop();
	}
}

function draw() {
	if (!paused) handleSound();
	render();
	counter++;
}
