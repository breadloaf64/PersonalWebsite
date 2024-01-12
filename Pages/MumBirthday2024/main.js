let s = 100;
let seed;
let t = 0;

let squareWidth = 1000;
let margin;

let mainLeafLayer;
let overlayLeafLayer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  squareWidth = min(squareWidth, height) * 0.8;
  s = (squareWidth / 455) * 100;
  margin = createVector(
    (windowWidth - squareWidth) / 2,
    (windowHeight - squareWidth) / 2,
  );
  imgNoiseTexture = generateNoiseTexture();
  seed = random(100);
  mainLeafLayer = new LeafLayer(0);
  overlayLeafLayer = new LeafLayer(1);
}

function draw() {
  t++;
  handleWind();
  handleMouseMove();
  render();
  mainLeafLayer.tick();
  overlayLeafLayer.tick();
}

function render() {
  background(250);
  image(imgNoiseTexture, 0, 0);
  mainLeafLayer.draw();

  sakura(width / 2, height * 0.8);
  ground();
  overlay();
  overlayLeafLayer.draw();

  drawMessage(
    "happy birthday mum",
    height * 0.85,
    min(squareWidth, height) * 0.07,
  );
  noiseLayer();
}

function noiseLayer() {
  const NUM_PIXELS = 1000;
  strokeWeight(1);
  stroke(0, 100);
  for (let i = 0; i < NUM_PIXELS; i++) {
    const x = random(width);
    const y = random(height);
    point(x, y);
  }
}

function ground() {
  noStroke();
  fill("#ffafcc");
  circle(width / 2, height / 2 + s * 6, s * 9);
}

function overlay() {
  noStroke();
  fill("#cedeeb");
  //top
  rect(0, 0, width, margin.y);

  //bottom
  rect(0, height - margin.y, width, margin.y);

  //left
  rect(0, 0, margin.x, height);

  //right
  rect(width - margin.x, 0, margin.x, height);

  noFill();
  stroke("#cdb4db");
  strokeWeight(10);
  rect(margin.x, margin.y, squareWidth, squareWidth);
}

let winds = [];
let windStrengths = [];
let additionalWindStrength = 0;
let gustUntilTEquals = 0;

function handleWind() {
  const MAX_WIND_HiSTORY = 20;

  const gusting = t < gustUntilTEquals;
  const MAX_GUST_POWER = 0.2;
  const gustPower = (1 / (gustUntilTEquals - t)) * MAX_GUST_POWER;
  const WIND_DAMPING_COEFFICIENT = 0.98;
  const MIN_WIND_STRENGTH = 0;
  additionalWindStrength = constrain(
    gusting
      ? additionalWindStrength + gustPower
      : additionalWindStrength * WIND_DAMPING_COEFFICIENT,
    0,
    1,
  );

  const windStrength = constrain(
    MIN_WIND_STRENGTH + additionalWindStrength,
    0,
    1,
  );

  const RUFFLE_SPEED = 0.15;

  const currentWindOffset = sin(t * RUFFLE_SPEED) * s * 0.1 * windStrength;

  winds.unshift(currentWindOffset);
  winds = winds.slice(0, MAX_WIND_HiSTORY);

  windStrengths.unshift(windStrength);
  windStrengths = windStrengths.slice(0, MAX_WIND_HiSTORY);
}

function getWind(delay) {
  return winds[floor(map(delay, 0, 3, 0, winds.length))] ?? 0;
}

function getWindStrength(delay) {
  return windStrengths[floor(map(delay, 0, 3, 0, windStrengths.length))] ?? 0;
}

function makeGust() {
  const GUST_LENGTH = 50;
  gustUntilTEquals = t + GUST_LENGTH;
}

function mouseClicked() {
  makeGust();
}

let currentMouse;

function handleMouseMove() {
  const previousMouse = currentMouse ? currentMouse.copy() : createVector(0, 0);
  currentMouse = createVector(mouseX, mouseY);
  const delta = currentMouse.copy().sub(previousMouse);
  const deltaMagnitude = delta.mag();
  if (deltaMagnitude > s / 10) {
    makeGust();
  }
}
