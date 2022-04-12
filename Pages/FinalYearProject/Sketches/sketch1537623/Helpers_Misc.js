function copyImage(img) {
	return img.get(0, 0, floor(img.width), floor(img.height));
}

function posMod(a, b) {
	// returns how far a is from the closest lower multiple of b
	let result = a % b;
	if (result < 0) result += b;
	return result;
}

function mouseIsOnScreen() {
	return !(mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY);
}

function mouseIsInBounds(x, y, w, h) {
	return !(mouseX < x || x + w < mouseX || mouseY < y || y + h < mouseY);
}

function coordinateIsInBounds(i, j, x, y, w, h) {
	return !(i < x || x + w < i || j < y || y + h < j);
}

function takePhoto() {
	photo = get(layout.subSubPrimarySquare_x + 1, layout.subSubPrimarySquare_y + 1, layout.subSubPrimarySquare_w - 2, layout.subSubPrimarySquare_h - 2); //we capture from one pixel smaller than the box, so we don't get the transluent mask
	photo.filter(ERODE);
}

playing = false;
function stopStart() {
	if (playing) {
		stopPlaying();
	}
	else {
		timeAtStart = millis();
		playing = true;
	}
}

function stopPlaying() {
	for (let sequence of sequences) {
		sequence.silence();
	}
	playing = false;
}