function render() {
  background(255);
  drawGrid();
  drawVoices();
  playHead.draw();
  drawButtons();
  drawQuantiseMode();
  drawPauseScreen();
  image(imgNoiseTexture, 0, 0);
  drawFrame();
}

function drawGrid() {
  stroke(colGrid);
  strokeWeight(1);

  // vertical lines;
  for (let i = 0; i < numQuantisedBeats; i++) {
    let x = map(i, 0, numQuantisedBeats, 0, width);
    line(x, 0, x, height);
  }

  // horizontal lines;
  let originNote = 0; // lines will appear each octave where this note appears
  for (let note = minNote; note <= maxNote; note++) {
    if (posMod(note - originNote, 12) == 0) {
      let y = map(frequencyToProp_exp(noteToFrequency(note)), 0, 1, height, 0);
      line(0, y, width, y);
    }
  }
}

function drawVoices() {
  for (let voice of voices) {
    voice.draw();
  }
}

function drawButtons() {
  if (!paused) {
    noStroke();
    txtSize = width / 30;
    textFont("monospace", txtSize);
    btnPause.draw();
    btnQuantise.draw();
    btnClear.draw();
  }
}

function drawQuantiseMode() {
  if (!paused) {
    let modes = ["none", "pitch", "time", "pitch + time"];
    let modeText = modes[quantiseMode];

    noStroke();
    txtSize = width / 30;
    textFont("monospace", txtSize);
    fill(colReadout);

    text(
      modeText,
      btnQuantise.w +
        btnQuantise.x +
        (btnQuantise.w - textWidth(btnQuantise.text)) / 2,
      btnQuantise.y + btnQuantise.h / 2 + 0.25 * textSize(),
    );
  }
}

function drawPauseScreen() {
  if (paused) {
    // tint background darker
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    fill(255);

    // draw instruction
    txtSize = width / 12;
    textFont("monospace", txtSize);
    let instruction = "tap/click to play";
    txtWidth = textWidth(instruction);
    text("tap/click to play", (width - txtWidth) / 2, height * 0.5);
  }
}

function drawFrame() {
  strokeWeight(30);
  stroke(colFrame);
  noFill();
  rect(0, 0, width, height);
}
