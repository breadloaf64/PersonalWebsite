var imgNoiseTexture;

var colFrame;
var colBackground;
var colReadouts;
var colGrid;
var colSequence;
var colPlayHead;
var colPauseButtonBorder;
var colPauseButton;

function setColours() {
  colFrame = color("#231942");
  colBackground = color("#f4f3ee");
  colReadouts = color("#5e548e");
  colGrid = color("#be95c4");
  colSequence = color("#5e548e");
  colPlayHead = color("#9f86c0");

  colPauseButtonBorder = color(0, 0);
  colPauseButton = color("#2f3e46");
  colPauseButton.setAlpha(100);
}

function setNoiseTexture() {
  let amount = 0.2;
  let img = createImage(int(width), int(height));
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      if (random(1) < amount) {
        img.set(i, j, color(random(255), 15));
      } else {
        img.set(i, j, color(0, 0));
      }
    }
  }
  img.updatePixels();
  imgNoiseTexture = img;
}

function drawFrame() {
  strokeWeight(30);
  stroke(colFrame);
  noFill();
  rect(0, 0, width, height);
}

function myStandardSetup() {
  setCanvas();
  setColours();
  setNoiseTexture();
  makePauseButton();
}

function setCanvas() {
  if (embeddedOnWebsite) {
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    let canvas = createCanvas(100, 100);

    try {
      canvas.parent("sketch-holder");
    } catch {}
    windowResized();
  } else {
    let size = min(windowWidth, windowHeight) * 0.8;
    createCanvas(size, size);
  }
}

function makePauseButton() {
  let btnHeight = height * 0.04;
  let btnWidth = (btnHeight * 7) / 2;
  let text = "pause";
  btnPause = new Button(
    width - btnWidth - 20,
    height - btnHeight - 20,
    btnWidth,
    btnHeight,
    pauseUnpause,
    text,
  );
}
