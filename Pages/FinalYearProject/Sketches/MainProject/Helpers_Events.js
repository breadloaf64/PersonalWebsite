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
  timeAtTouchStart = millis();
  if (embeddedOnWebsite && mouseIsOnScreen()) {
    // if on a website, don't register the click if it's off the sketch
    return false;
  }
}

function touchEnded() {
  if (clickedThisFrame) return false;

  // check for just a quick tap
  if (millis() - timeAtTouchStart < 500) {
    clickedThisFrame = true;
    currentScene.mouseClicked();
  }
}

function keyTyped() {
  if (key === " ") {
    let string =
      "tonic: " + sequences[currentSequenceIndex].scale.tonic + ", Degrees: ";
    for (let d of sequences[currentSequenceIndex].scale.degrees) {
      string += d + ", ";
    }
    print(string);
  }
}
