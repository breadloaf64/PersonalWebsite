function render() {
	background(colBackground);
	drawCapture();
	drawFlipCameraButton();
	image(imgNoiseTexture, 0, 0);
	drawFilterName();
	drawFrame();
}

function drawFilterName() {
	//background
	noStroke();
	fill(colFilterNameBackground);
	rect(10, height - txtSize - 20, textWidth(filterNames[filterSelection]) + 20, txtSize * 1.5);
	
	// font formatting
	fill(colFilterName);
	noStroke();
	txtSize = width / 30;
	textFont("monospace", txtSize);
	
	text(filterNames[filterSelection], 20, height - 20);
}

function drawCapture() {
	let img = capture.get(0, 0, capture.width, capture.height);
	
	// filter image
	if (filterSelection == 0);
	else if (filterSelection == 1) img.filter(THRESHOLD, map(mouseY, height, 0, 0, 1), true);
	else if (filterSelection == 2) img.filter(GRAY);
	else if (filterSelection == 3) img.filter(INVERT);
	else if (filterSelection == 4) img.filter(POSTERIZE, round(map(mouseY, height, 0, 2, 10, true)));
	else if (filterSelection == 5) img.filter(BLUR, round(map(mouseY, height, 0, 1, 4, true)));
	else if (filterSelection == 6) img.filter(ERODE);
	else if (filterSelection == 7) img.filter(DILATE);
	
	drawImage(img, 0, 0, w, h, facingUser);
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