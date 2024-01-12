var imgNoiseTexture;

var colFrame;
var colBackground;

var colFilterName;
var colFilterNameBackground;

var colFlipCameraButtonFill;
var colFlipCameraButtonBorder;
var colFlipCameraButtonText;

function setColours() {
  colFrame = color("#333d29");
  colBackground = color("#ffffff");

  colFilterName = color("#333d29");
  colFilterNameBackground = color("#ffffff");
  colFilterNameBackground.setAlpha(200);

  colFlipCameraButtonFill = color("#b6ad90");
  colFlipCameraButtonFill.setAlpha(200);
  colFlipCameraButtonBorder = color("#cb997e");
  colFlipCameraButtonBorder.setAlpha(0);
  colFlipCameraButtonText = color("#333d29");
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
  pixelDensity(1);
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
    w = size;
    h = size;
  }
}
