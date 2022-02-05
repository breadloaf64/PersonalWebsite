function render() {
	background(colBackground);
	drawCapture();
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}

function drawCapture() {
	image(capture, 0, 0);
}