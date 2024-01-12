var imgNoiseTexture;

function setColours() {
  colFrame = color("#000000");
  colBackground = color("#FFFFFF");

  colButtonFill = color("#ffe8d6");
  colButtonBorder = color("#cb997e");
  colButtonText = color("#cb997e");

  colReadouts = color("#000000");
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
