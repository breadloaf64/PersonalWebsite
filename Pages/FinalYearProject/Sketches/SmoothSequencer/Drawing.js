function render() {
  background(colBackground);
  drawGrid();
  drawReadouts();
  drawPlayHead();
  drawSequence();
  drawButton();
  drawPauseScreen();
  image(imgNoiseTexture, 0, 0);
  drawFrame();
}

function drawButton() {
  if (!paused) {
    noStroke();
    txtSize = width / 30;
    textFont("monospace", txtSize);
    btnPause.draw();
  }
}

function drawSequence() {
  stroke(colSequence);
  strokeWeight(8);

  let gradientDiffTheshold = 20;
  let prevGradient = 0;

  for (let i = 0; i < width - 1; i++) {
    let gradient = sequence[i + 1] - sequence[i];
    // only draw lines that are "continuous" i.e. sequential gradients are sufficiently similar
    if (abs(gradient - prevGradient) < gradientDiffTheshold) {
      line(i, sequence[i], i + 1, sequence[i + 1]);
    }
    point(i, sequence[i]); // so that 1 pixel long parts of the sequence are drawn
    prevGradient = gradient;
  }
}

function drawGrid() {
  // formatting
  stroke(colGrid);
  strokeWeight(1);
  noFill();

  let n = 4; // we will draw 2n lines across the grid
  let dist = width / (2 * n);

  for (let i = -n; i < n; i++) {
    let p = width / 2 + i * dist;
    line(p, 0, p, height); // vertical
    line(0, p, width, p); // horizontal
  }
}

function drawPlayHead() {
  strokeWeight(4);
  stroke(colPlayHead);
  noFill();

  let n = 5;
  beginShape();
  vertex(playHeadPos, 0);
  vertex(playHeadPos, 0);
  for (let i = 1; i < n; i++) {
    let x = playHeadPos;
    let y = (i * height) / n;

    // add noise
    let pointOffset = map(volume, 0, 1, 3, 6);
    let noiseMultiplier = 0.2;
    let noisePeriod = (1 / frequency) * noiseMultiplier;
    let noiseZOffset = sin((counter / noisePeriod) * TWO_PI);

    x +=
      noise(x * noiseMultiplier, y * noiseMultiplier, noiseZOffset) *
      pointOffset;
    y +=
      noise(x * noiseMultiplier, y * noiseMultiplier + 100, noiseZOffset) *
      pointOffset;

    curveVertex(x, y);
  }
  vertex(playHeadPos, height);
  vertex(playHeadPos, height);
  endShape();
}

function drawReadouts() {
  // font formatting
  fill(colReadouts);
  noStroke();
  txtSize = width / 30;
  textFont("monospace", txtSize);
  //textStyle(BOLD);

  let txtFrequency = frequency.toFixed(2);
  let txtVolume = (volume * 100).toFixed(2);

  text("Frequency: " + txtFrequency + " Hz", 20, height - 20);
  text("Volume: " + txtVolume + " %", 20, height - 20 - txtSize);
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
