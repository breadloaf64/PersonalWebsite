let rx = 0;
let ry = 0;
let rz = 0;

function setup() {
  createMetaTag();
  createCanvas(window.innerWidth, window.innerHeight);

  rectMode(CENTER);
}

function draw() {
  rx = map(rotationX, -90, 90, 0, displayHeight);
  ry = map(rotationY, -90, 90, 0, displayWidth);
  rz = radians(rotationZ);

  background(50);
  noStroke();
  fill(255);

  push();
  translate(ry, rx);
  rotate(rz);
  rect(0, 0, 150, 150);
  pop();
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
