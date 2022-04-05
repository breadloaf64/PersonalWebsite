function mouseClicked() {
	if (embeddedOnWebsite && !mouseIsOnScreen()) {
		// if on a website, don't register the click if it's off the sketch
		return false;
	}
	
	currentScene.mouseClicked();
}

function touchStarted() {
	if (embeddedOnWebsite && mouseIsOnScreen()) {
		// if on a website, don't register the click if it's off the sketch
		return false;
	}
}

function touchEnded() {
	if (embeddedOnWebsite && !mouseIsOnScreen()) {
		// if on a website, don't register the click if it's off the sketch
		return false;
	}
	
	currentScene.mouseClicked();
}