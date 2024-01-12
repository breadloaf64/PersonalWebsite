var voices;
var currentVoice;

function initialiseVoices() {
  voices = [];
}

function updateCurrentVoice() {
  // update the sequence for the current voice. Interpolate between mouse's previous position and current position to ensure a smooth line is drawn

  if (!paused) {
    // create mouse left and mouse right from the positions of the mouse this frame and the last
    let ml = createVector(mouseX, mouseY);
    let mr = createVector(prevMouseX, prevMouseY);

    // if mouse left and mouse right are the wrong way round, swap 'em
    if (mr.x < ml.x) {
      let temp = mr.copy();
      mr = ml.copy();
      ml = temp.copy();
    }

    // scale ml and mr slightly so it's easier to hit t = 0 and t = 1 (you don't actually need your finger all the way on the edge of the screen)
    let scaleFactor = 1.01;
    let margin = (squareWidth * scaleFactor - squareWidth) / 2;
    ml.x = map(ml.x, 0 + margin, squareWidth - margin, 0, squareWidth, true);
    mr.x = map(mr.x, 0 + margin, squareWidth - margin, 0, squareWidth, true);

    if (mouseIsPressed && prevMouseIsPressed) {
      // this is so that on touch screen, if the user puts their finger down, there won't be a line between the position and previous position.
      if ((mouseX == prevMouseX && mouseY == prevMouseY) || ml.x == mr.x) {
        // yeah, this double if is dodgy, I know. But I think it's more readable
        // do nothing if the mouse hadn't moved, or if moved exactly vertically
      } else {
        // interpolate between mouse's last position and current position to draw smooth curve
        for (let i = round(ml.x); i <= round(mr.x); i++) {
          let lerpMouseX = i;
          let lerpMouseY = round(
            ml.y + ((mr.y - ml.y) * (i - ml.x)) / (mr.x - ml.x),
          );
          let t = map(lerpMouseX, 0, squareWidth, 0, 1, true);
          let v = map(lerpMouseY, height, 0, 0, 1, true);
          if (isNaN(v)) {
            print(
              "i: " +
                i +
                ", ml: (" +
                ml.x +
                ", " +
                ml.y +
                "), mr: (" +
                mr.x +
                ", " +
                mr.y +
                ")",
            );
          }
          currentVoice.updateSequence(t, v);
        }
      }
    }
  }
}

function clearVoices() {
  for (let voice of voices) {
    voice.stop();
  }
  initialiseVoices();
}
