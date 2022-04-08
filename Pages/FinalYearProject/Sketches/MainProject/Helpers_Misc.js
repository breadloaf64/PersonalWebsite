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
	photo = get(layout.subSubPrimarySquare_x, layout.subSubPrimarySquare_y, layout.subSubPrimarySquare_w, layout.subSubPrimarySquare_h);
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