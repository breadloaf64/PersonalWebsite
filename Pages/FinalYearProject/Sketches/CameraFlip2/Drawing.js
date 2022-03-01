function render() {
	background(colBackground);

	drawCapture();

	image(imgNoiseTexture, 0, 0);
	drawFrame();
}

function drawCapture() {
	if (false) {
    // flip camera horizontally
    translate(width, 0);
    scale(-1, 1);
  }
  image(capture, 0, 0, w, h);
}
