let capture;
let facingUser = true;

var w = 100;
var h = 100;

function setup() {
  createMetaTag();
  createCanvas(window.innerWidth, window.innerHeight);

  pixelDensity(1);

  setupCamera();

  frameRate(60);
}

function draw() {
  // if (facingUser) {
  //   // flip camera horizontally
  //   translate(width, 0);
  //   scale(-1, 1);
  // }
  // image(capture, 0, 0, w, h);

  drawCapture(0, 0, w, h);
}

function drawcapture(x, y, wi, he, flip) {
    if (flip) {
        push();
		translate(x + wi, y);
        scale(-1, 1);

		image(capture, 0, 0, wi, he);

		pop();
    }
    else {
        image(capture, x, y, wi, he);
    }

}

function touchStarted() {
  facingUser = !facingUser;
  setupCamera();
}

function setupCamera() {
  if (capture) {
    capture.remove();
  }

  capture = createCapture({
    video: {
			width: w,
			height: h,
      facingMode: facingUser ? 'user' : 'environment'
    },
    audio: false
  });
  capture.hide();
}

function touchMoved() {
  // prevent the display from moving around when you touch it
  return false;
}

function createMetaTag() {
  let meta = createElement('meta');
  meta.attribute('name', 'viewport');
  meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

  let head = select('head');
  meta.parent(head);
}
