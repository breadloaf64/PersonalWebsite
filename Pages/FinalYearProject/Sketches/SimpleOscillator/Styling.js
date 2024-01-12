var imgNoiseTexture;

var colFrame;
var colBackground;
var colReadouts;
var colCrosshair;
var colWave;
var colGrid;
var colPauseButtonBorder;
var colPauseButton;

function setColours() {
  colFrame = color("#2f3e46");
  colBackground = color("#354f52");
  colReadouts = color("#84a98c");
  colCrosshair = color("#84a98c");
  colWave = color("#cad2c5");
  colGrid = color("#52796f");

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
  createMetaTag();
  setColours();
  setNoiseTexture();
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

function createMetaTag() {
  let meta = createElement("meta");
  meta.attribute("name", "viewport");
  meta.attribute(
    "content",
    "user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height",
  );

  let head = select("head");
  meta.parent(head);
}

function windowResized() {
  let parent = canvas.parentElement;
  let w = parent.clientWidth;
  let h = parent.clientHeight;

  let size = min(w, h);
  resizeCanvas(size, size, true);
  makePauseButton();
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
