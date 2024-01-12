var prevMouseX;
var prevMouseY;
var prevMouseIsPressed = false;
var editingSequence = false;

function updatePrevMouse() {
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  prevMouseIsPressed = mouseIsPressed;
}

function mouseClicked() {
  if (!mouseIsOnScreen()) {
    // if on a website, don't register the click if it's off the sketch
    return;
  }

  if (paused) pauseUnpause();
  else {
    btnPause.tryClick();
    btnQuantise.tryClick();
    btnClear.tryClick();
  }
}

function mousePressed() {
  if (mouseIsOnScreen()) {
    currentVoice = new Voice();
    voices.push(currentVoice);
    editingSequence = true;
  }
}

function handleMouseDrag() {
  if (mouseIsPressed && mouseIsOnScreen() && editingSequence) {
    updateCurrentVoice();
  }
}

function mouseReleased() {
  editingSequence = false;
}

function mouseIsOnScreen() {
  return !(mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY);
}
