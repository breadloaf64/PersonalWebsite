function render() {
	background(colBackground);
	drawReadouts();
	drawPauseButton();
	drawPauseScreen();
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}

function drawReadouts() {

	// font formatting
	fill(colReadouts);
	noStroke();
	txtSize = width / 30;
	textFont("monospace", txtSize);
	//textStyle(BOLD);

	let rotXText = "rot x: " + rotationX;
	let rotYText = "rot y: " + rotationY;
	let rotZText = "rot z: " + rotationZ;

	text(rotXText, 20, height - 20 - 2 * (txtSize * 1.1));
	text(rotYText , 20, height - 20 - 1 * (txtSize * 1.1));
	text(rotZText, 20, height - 20 - 0 * (txtSize * 1.1));
}

function drawPauseButton() {
	if (!paused) {
		noStroke();
		txtSize = width / 30;
		textFont("monospace", txtSize);
		btnPause.draw();
	}
}

function drawPauseScreen() {
	if (paused) {
		// tint background darker
		noStroke();
		fill(0, 0, 0, 100);
		rect(0, 0, width, height);

		fill(255);

		// draw instruction
		txtSize = width / 12;
		textFont("monospace", txtSize);
		let instruction = "tap/click to play";
		txtWidth = textWidth(instruction);
		text("tap/click to play", (width - txtWidth) / 2, height * 0.5);
	}
}
