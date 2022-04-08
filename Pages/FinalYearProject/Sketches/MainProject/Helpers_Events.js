var clickedThisFrame = false;

function mouseClicked() {
	if (clickedThisFrame) return false;
	
	if (embeddedOnWebsite && !mouseIsOnScreen()) {
		// if on a website, don't register the click if it's off the sketch
		return false;
	}
	
	clickedThisFrame = true;
	currentScene.mouseClicked();
}

var timeAtTouchStart = 0;
function touchStarted() {
	if (embeddedOnWebsite && mouseIsOnScreen()) {
		// if on a website, don't register the click if it's off the sketch
		return false;
	}
	timeAtTouchStart = millis();
}

function touchEnded() {
	if (clickedThisFrame) return false;

	// check for just a quick tap
	if (millis() - timeAtTouchStart < 500) {
		clickedThisFrame = true;
		currentScene.mouseClicked();
	}
}