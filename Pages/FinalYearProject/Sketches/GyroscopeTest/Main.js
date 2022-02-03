var counter = 0;

var currentMouseX = 0;
var currentMouseY = 0;

var btnPause;
var paused = true;

function preload() {

}

function setup() {
	myStandardSetup();
	makePauseButton();

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

function keyPressed() {
	if (key == ' ' || key == 'p'){ //spacebar or p to pause/unpause
    pauseUnpause();
  }
	return false;
}

function pauseUnpause() {
	paused = !paused;
	if (!paused) {

	}
	else {

	}
}

function mouseClicked() {
	if (paused) pauseUnpause();
	btnPause.tryClick();
}

function handleCurrentMouse() {
	if (!paused) {
		currentMouseX = mouseX;
		currentMouseY = mouseY;
	}
}

function draw() {
	handleCurrentMouse();
	render();
	counter++;
}
