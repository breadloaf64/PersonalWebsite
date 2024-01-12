function render() {
  background(colBackground);
  drawRain();
  cloud(mouseX, mouseY, width / 20, 0);
  drawPlants();
  drawGround();
  drawMessage("happy father's day", height * 0.8, width * 0.05);
  drawMessage("love, peter", height * 0.9, width * 0.03);
  drawRevealPanels();
  drawInstructions();
  drawFrame();
}

function drawGround() {
  drawEarth();
}

function drawRain() {
  for (let r of raindrops) {
    r.draw();
  }
}

function drawEarth() {
  fill(colEarth);
  stroke(colEarthStroke);
  strokeWeight(10);
  rect(0, height * 0.7, width, height);
}

function drawPlants() {
  for (let p of plants) {
    p.draw();
  }
}

function drawRaindrops() {
  for (let r of raindrops) {
    r.draw();
  }
}

function drawRevealPanels() {
  for (let p of revealPanels) {
    p.draw();
  }
}

var waveSpeed = 0.023;
var counter = 0;

function drawMessage(message, y, size) {
  noStroke();
  let letterSpace = size * 0.7;
  textFont("serif", size);
  fill(colMessage);
  let messageWidth = letterSpace * message.length;

  for (var x = 0; x < message.length; x++) {
    var c = message.charAt(x);
    letter(
      c,
      width / 2 - messageWidth / 2 + x * letterSpace,
      y,
      x,
      (2 * size) / 20,
    );
  }
}

function letter(c, x, y, i, randomAmount) {
  let letterSpeed = waveSpeed * 0.2;
  let posX = x + noise(counter * letterSpeed, i * 5) * randomAmount;
  let posY = y + noise(counter * letterSpeed, -i * 7) * randomAmount;
  let angleVariance = randomAmount * 0.02;
  let theta = map(
    noise(counter * letterSpeed, i * 13),
    0,
    1,
    -angleVariance,
    angleVariance,
  );

  push();
  translate(posX, posY);
  rotate(theta);
  text(c, 0, 0);
  pop();
}

var cleared = false;
var instructionAlpha = 255;

function drawInstructions() {
  noStroke();
  if (cleared) instructionAlpha -= 5;
  fill(0, instructionAlpha);
  textFont("serif", width / 20);
  textAlign(CENTER, TOP);
  text("click to rain", width / 2, height * 0.05);
}
