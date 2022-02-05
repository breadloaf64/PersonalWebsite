function preload() {}

function setup() {
	myStandardSetup();
	
	pixelDensity(1);
  setupCamera();
}

function keyPressed() {
	if (key == ' ' || key == 'p'){ //spacebar or p to pause/unpause
    
  } 
	return false;
}

function mouseClicked() {
}


function draw() {
	render();
}