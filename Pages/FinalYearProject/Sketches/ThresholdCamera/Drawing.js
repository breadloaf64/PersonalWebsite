function render() {
	background(colBackground);
	
	if (takingPhoto) {
		image(capture.get(0, 0, w, h), 0, 0);
	}
	else {
		image(poster, 0, 0);
	}
	
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}