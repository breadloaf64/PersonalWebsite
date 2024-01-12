//animation
var counter = 0;
var stage = 0;
const stageCount = 4; //STAGES: oct, box, oct, star
const rotPeriod16th = 50;
const stagePeriods = [
  3 * rotPeriod16th,
  4 * rotPeriod16th,
  3 * rotPeriod16th,
  5 * rotPeriod16th,
];

// fractal drawing parameters
var patternMode = 0;
var patternCount = 3; // oct, box, star
var spinIn = 0;
var spinOut;

// color palette
var colFrame;
var colFractal;
var colBackMain;

//extra
var smallestPerimeter = 100;
var evadeMouse = true;
var evadeMouseAmountAbs = 0.005;

function preload() {
  setColours();
}

function setup() {
  size = min(windowWidth, windowHeight) * 0.4;
  var canvas = createCanvas(size, size);
  canvas.parent("sketch-holder");
  //noCursor();
  //frameRate(15);

  spinOut = PI / 4;
}

function mouseClicked() {
  stage = 0;
  counter = 0;
}

function draw() {
  update();
  render();
}

function update() {
  counter++;
  if (counter >= stagePeriods[stage]) {
    stage = (stage + 1) % stageCount;
    counter = 0;
  }

  // set evadeMouseAmount
  let transitionLength = 40;
  if (abs(counter - 0) < transitionLength) {
    evadeMouseAmount = sigmoidMap(
      abs(counter - 0),
      0,
      transitionLength,
      0,
      evadeMouseAmountAbs,
    );
  } else if (abs(counter - stagePeriods[stage]) < transitionLength) {
    evadeMouseAmount = sigmoidMap(
      abs(counter - stagePeriods[stage]),
      0,
      transitionLength,
      0,
      evadeMouseAmountAbs,
    );
  } else {
    evadeMouseAmount = evadeMouseAmountAbs;
  }

  switch (stage) {
    case 0: //oct
      patternMode = 0;
      spinIn = map(counter, 0, stagePeriods[stage], -PI / 8, PI / 4);
      break;
    // patternMode = 2;
    // spinIn = 0;
    // break;

    case 1: //box
      patternMode = 1;
      spinIn = map(counter, 0, stagePeriods[stage], PI / 2, 0);
      break;

    case 2: //oct
      patternMode = 0;
      spinIn = map(counter, 0, stagePeriods[stage], 0, (3 * PI) / 8);
      break;

    case 3: //star
      patternMode = 2;
      spinIn = map(counter, 0, stagePeriods[stage], PI / 2, 0);
      break;
  }
}

function render() {
  drawBackground();
  drawShapes();
  //drawFrame();
}

function drawBackground() {
  background(colBackMain);
}

function drawShapes() {
  let l = width * 0.6;

  switch (patternMode) {
    case 0:
      stroke(colPattern);
      noStroke();
      fill(colPattern);
      pattern_oct(width / 2 - l / 2, height / 2 - l / 2, l, 5);
      break;

    case 1:
      //background square
      tempEvadeMouse = evadeMouse;
      evadeMouse = false;

      fill(colPattern);
      noStroke();
      mySquare(createVector(width / 2, height / 2), l, spinOut);

      evadeMouse = tempEvadeMouse;

      //pattern
      fill(colBackMain);
      pattern_sq(width / 2 - l / 2, height / 2 - l / 2, l, 5);
      break;

    case 2:
      //background square
      tempEvadeMouse = evadeMouse;
      evadeMouse = false;

      fill(colPattern);
      noStroke();
      mySquare(createVector(width / 2, height / 2), l, spinOut);

      evadeMouse = tempEvadeMouse;

      //pattern
      fill(colBackMain);
      pattern_star(width / 2 - l / 2, height / 2 - l / 2, l, 5);
      break;
  }
}

function pattern_oct(x, y, l, n) {
  // pattern properties
  let centre = createVector(x + l / 2, y + l / 2);

  //octagon properties
  let boundingBoxLength = l / n;
  let sideLength = (boundingBoxLength * sqrt(2)) / (sqrt(2) + 2);
  let circumradius = sideLength * (sqrt(4 + 2 * sqrt(2)) / 2);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //octagon coords
      let ox = x + (i + 1 / 2) * boundingBoxLength;
      let oy = y + (j + 1 / 2) * boundingBoxLength;

      let centreToOct = createVector(ox, oy).sub(centre);
      let spun = centre.copy().add(centreToOct.rotate(spinOut));

      octagon(spun, circumradius, spinIn + spinOut);
    }
  }
}

function pattern_sq(x, y, l, n) {
  // pattern properties
  let centre = createVector(x + l / 2, y + l / 2);

  // octagon properties
  let boundingBoxLength = l / n;
  let sideLength = (boundingBoxLength * sqrt(2)) / (sqrt(2) + 2);

  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      let pos = createVector(
        x + i * boundingBoxLength,
        y + j * boundingBoxLength,
      );
      let centreToPos = pos.sub(centre);
      let spun = centre.copy().add(centreToPos.rotate(spinOut));

      mySquare(spun, sideLength, spinOut + spinIn + PI / 4);
    }
  }
}

function pattern_star(x, y, l, n) {
  // pattern properties
  let centre = createVector(x + l / 2, y + l / 2);

  // octagon properties
  let boundingBoxLength = l / n;
  let sideLength = (boundingBoxLength * sqrt(2)) / (sqrt(2) + 2);
  let circumradius = sideLength * (sqrt(4 + 2 * sqrt(2)) / 2);

  //star properties
  let shortR = sqrt(2 * sq(boundingBoxLength)) / 2 - circumradius;
  let longR =
    boundingBoxLength / 2 -
    tan(radians(135) / 2) * (circumradius - boundingBoxLength / 2);

  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      let pos = createVector(
        x + i * boundingBoxLength,
        y + j * boundingBoxLength,
      );
      let centreToPos = pos.sub(centre);
      let spun = centre.copy().add(centreToPos.rotate(spinOut));

      myStar(spun, shortR, longR, spinOut + spinIn);
    }
  }
}

function octagon(centre, circumRadius, rotation) {
  EvadeMouse(centre);
  let radius = p5.Vector.fromAngle(PI / 8 + rotation, circumRadius);

  beginShape();
  for (let i = 0; i < 8; i++) {
    let pos = centre.copy().add(radius);
    vertex(pos.x, pos.y);
    radius.rotate(PI / 4);
  }
  endShape(CLOSE);
}

function mySquare(centre, sidelength, rotation) {
  EvadeMouse(centre);
  push();
  translate(centre.x, centre.y);
  rotate(rotation);
  rect(-sidelength / 2, -sidelength / 2, sidelength, sidelength);
  pop();
}

function myStar(centre, shortR, longR, rotation) {
  EvadeMouse(centre);
  let longRadius = p5.Vector.fromAngle(0 + rotation, longR);
  let shortRadius = p5.Vector.fromAngle(PI / 4 + rotation, shortR);

  beginShape();
  for (let i = 0; i < 4; i++) {
    let longPos = centre.copy().add(longRadius);
    vertex(longPos.x, longPos.y);
    longRadius.rotate(PI / 2);

    let shortPos = centre.copy().add(shortRadius);
    vertex(shortPos.x, shortPos.y);
    shortRadius.rotate(PI / 2);

    // strokeWeight(1);
    // stroke(255, 0, 0);
    // line(longPos.x, longPos.y, shortPos.x, shortPos.y);
  }
  endShape(CLOSE);
}

function EvadeMouse(centre) {
  if (evadeMouse) {
    let mouse = createVector(mouseX, mouseY);
    let mouseToShape = centre.copy().sub(mouse);
    let distance = mouseToShape.mag();
    let repelAmount = (5000000 / sq(distance)) * evadeMouseAmount;
    repelAmount = constrain(repelAmount, 0, width / 16);
    let repelVector = mouseToShape.copy().setMag(repelAmount);
    centre.add(repelVector);
  }
}

function drawFrame() {
  strokeWeight(30);
  stroke(colFrame);
  noFill();
  rect(0, 0, width, height);
}

function sigmoidMap(x, xmin, xmax, ymin, ymax) {
  x = map(x, xmin, xmax, -6, 6); // remaps x from desired domain to sigmoid domain (-6, 6)
  let y = 1 / (1 + exp(-x)); //sigmoid
  y = map(y, 0, 1, ymin, ymax); //remaps from sigmoid range (0, 1) to desired range
  return y;
}

function setColours() {
  colFrame = color("#006d77");
  colPattern = color("#83c5be");
  colBackMain = color("#ffffff");
}
