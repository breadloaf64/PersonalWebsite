let capture;
let facingUser = false;

// canvas and capture size
var w = 400;
var h = 400;

function setup() {
  myStandardSetup();
  setupCapture();
}

function draw() {
  render();
}

function mouseClicked() {
  if (
    embeddedOnWebsite &&
    (mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)
  ) {
    // if on a website, don't register the click if it's off the sketch
    return;
  }

  facingUser = !facingUser;
  setupCapture();
  print("capture size: " + capture.width + " " + capture.height);
  print("canvas size: " + width + " " + height);
  print("w/h: " + w + " " + h);
}

function setupCapture() {
  if (capture) {
    capture.remove();
  }

  capture = createCapture({
    video: {
      width: w,
      height: h,
      facingMode: facingUser ? "user" : "environment",
    },
    audio: false,
  });
  capture.hide();
}
