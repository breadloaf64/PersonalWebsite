function mousePressed() {
  addEvent("mousePressed");
}

function mouseReleased() {
  addEvent("mouseReleased");
}

function mouseClicked() {
  addEvent("mouseClicked");
}

function mouseDoubleClicked() {
  addEvent("mouseDoubleClicked");
}

function mouseMoved() {
  if (
    eventLog.length > 0 &&
    eventLog[eventLog.length - 1].includes("mouseMoved")
  ) {
    changeLastEvent("mouseMoved");
  } else {
    addEvent("mouseMoved");
  }
}

function mouseDragged() {
  if (
    eventLog.length > 0 &&
    eventLog[eventLog.length - 1].includes("mouseDragged")
  ) {
    changeLastEvent("mouseDragged");
  } else {
    addEvent("mouseDragged");
  }
}

function keyPressed() {
  addEvent("keyPressed | keyCode: " + keyCode);
}

function keyTyped() {
  addEvent("keyTyped | key: " + key);
}

function keyReleased() {
  addEvent("keyReleased | keyCode: " + keyCode);
}

function touchStarted() {
  addEvent("touchStarted | numTouches: " + touches.length);
}

function touchMoved() {
  if (
    eventLog.length > 0 &&
    eventLog[eventLog.length - 1].includes("touchMoved")
  ) {
    changeLastEvent("touchMoved | numTouches: " + touches.length);
  } else {
    addEvent("touchMoved | numTouches: " + touches.length);
  }
}

function touchEnded() {
  addEvent("touchEnded | numTouches: " + touches.length);
}
