function render() {
	background(colBackground);

	if (takingPhoto) {
		drawImage(capture.get(0, 0, w, h), 0, 0, w, h, facingUser);
	} else {
		drawImage(poster, 0, 0, w, h, facingUser);
	}
	drawFlipCameraButton();
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}

function drawImage(img, x, y, wi, he, mirrored) {
	if (mirrored) {
		push();
		translate(x + wi, y);
		scale(-1, 1);

		image(img, 0, 0, wi, he);

		pop();
	} else {
		image(img, x, y, wi, he);
	}
}

function drawFlipCameraButton() {
	noStroke();
	txtSize = width / 30;
	textFont("monospace", txtSize);
	btnFlipCamera.draw();
}