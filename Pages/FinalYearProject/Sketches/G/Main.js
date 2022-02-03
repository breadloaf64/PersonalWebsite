let rx = 0;
let ry = 0;
let rz = 0;

permissionGranted = false;


function setup() {
  createMetaTag();
  createCanvas(window.innerWidth, window.innerHeight);

  rectMode(CENTER);

  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device

    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);

  this.remove();
}

function draw() {
    try {
        rx = map(rotationX, -90, 90, 0, displayHeight);
        ry = map(rotationY, -90, 90, 0, displayWidth);
        rz = radians(rotationZ);
    }
  catch{};

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
