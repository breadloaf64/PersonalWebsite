var gameState = 1; // 1 is playing, 2 is game over

var direction = "";
var gameSize = 12;
var s;

var UP;
var DOWN;
var LEFT;
var RIGHT;

var apple;

function setup() {
	myStandardSetup();
	
	frameRate(10);
	
	// direction vectors
	UP = createVector(0, -1);
	DOWN = createVector(0, 1);
	LEFT = createVector(-1, 0);
	RIGHT = createVector(1, 0);
	
	resetGame();
}

function resetGame() {
	// game objects
	s = new Snake();
	setApple();
	gameState = 1;
}

function setApple() {
	let validPlacement = false;
	while(!validPlacement) {
		apple = createVector(floor(random(gameSize)), floor(random(gameSize)));
		validPlacement = !s.contains(apple);
	}
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = "l";
  } 
	else if (keyCode === RIGHT_ARROW) {
    direction = "r";
  }
	else if (keyCode === UP_ARROW) {
    direction = "u"
  } 
	else if (keyCode === DOWN_ARROW) {
    direction = "d";
  }
	
	if (gameState == 2) {
		resetGame();
		//print("reset game");
	}
	
	//s.move(direction);
	//s.printSnake();
}

function draw() {
	if (gameState == 1) {
		s.move(direction);
	}
	render();
}

function render() {
	background(colBackground);
	s.draw();
	drawApple();
	
	if (gameState == 2) {
		drawGameOverScreen();
	}
	
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}

function drawGameOverScreen() {
	fill(colGameOver);
	rect(0, 0, width, height);
	
	fill(colFrame);
	textFont("monospace", 30);
	text("game over_", 20, height - 20);
}

function drawApple() {
	colourGamePixel(apple.x, apple.y, colApple);
}

function colourGamePixel(x, y, color) {
	let rx = map(x, 0, gameSize, 0, width);
	let rw = map(x + 1, 0, gameSize, 0, width) - rx;
	
	let ry = map(y, 0, gameSize, 0, height);
	let rh = map(y + 1, 0, gameSize, 0, height) - ry;
	
	let roundness = rw / 8;
	
	noStroke();
	fill(color);
	rect(rx, ry, rw, rh, roundness, roundness, roundness, roundness);
}

function equalVectors(v1, v2) {
	return v1.x == v2.x && v1.y == v2.y;
}