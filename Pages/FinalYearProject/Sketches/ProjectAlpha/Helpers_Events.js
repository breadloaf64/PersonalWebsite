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

function touchStarted() {
  if (embeddedOnWebsite && mouseIsOnScreen()) {
    // if on a website, don't register the click if it's off the sketch
    return false;
  }
}

function touchEnded() {
  if (clickedThisFrame) return false;

  if ((embeddedOnWebsite && !mouseIsOnScreen()) || clickedThisFrame) {
    // if on a website, don't register the click if it's off the sketch
    return false;
  }

  clickedThisFrame = true;
  currentScene.mouseClicked();
}
