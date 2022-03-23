var flowers = [];
var vines = [];

var maxVines = 7;

var waveSpeed = 0.023;
var counter = 0;

function setup() {
	setColours();
	createCanvas(windowWidth, windowHeight);
	
	imgNoiseTexture = generateNoiseTexture();
}

function generateNoiseTexture() {
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
	return img;
}

function draw() {
	counter++;
	tickObjects();
	render();
}

function tickObjects() {
	tickFlowers();
	tickVines();
	tryMakeVine();
}

var timeToNextVine = 0;
function tryMakeVine() {
	timeToNextVine -= deltaTime;
	if (timeToNextVine < 0 && vines.length < maxVines) {
		timeToNextVine = 3000;
		makeVine();
	}
}

function makeVine() {
	let sideways = random(1) > 0.5;
	
	if (sideways) {
		let x = random(width);
		let up = random(1) > 0.5;
		if (up) {
			vines.push(new Vine(x, height + 10, -PI / 2));
		}
		else {
			vines.push(new Vine(x, -10, PI / 2));
		}
	}
	else {
		let y = random(height);
		let right = random(1) > 0.5;
		if (right) {
			vines.push(new Vine(-10, y, 0));
		}
		else {
			vines.push(new Vine(width + 10, PI));
		}
	}
	print("made");
}

function tickFlowers() {
	for (let flower of flowers) {
		flower.tick();
	}
}

function tickVines() {
	for (let vine of vines) {
		vine.tick();
	}
}

function render() {
	background(colBackground);
	drawObjects();
	drawMessage("happy mother's day", height / 2, min(width, height) * 0.07);
	drawMessage("love from peter", height * 0.6, min(width, height) * 0.03);
	image(imgNoiseTexture, 0, 0);
}

function drawObjects() {
	drawVines();
	drawFlowers();
}

function drawFlowers() {
	for (let flower of flowers) {
		flower.draw();
	}
}

function drawVines() {
	for (let vine of vines) {
		vine.draw();
	}
}

function drawMessage(message, y, size) {
	noStroke();
	let letterSpace = size * 0.7;
	textFont("serif", size);
	fill(colMessage);
	let messageWidth = letterSpace * message.length;
	
	for (var x = 0; x < message.length; x++) {
    var c = message.charAt(x);
    letter(c, width / 2 - messageWidth / 2 + x * letterSpace, y, x, 2 * size / 20);
	}
}

function letter(c, x, y, i, randomAmount) {
	let letterSpeed = waveSpeed * 0.2;
	let posX = x + noise(counter * letterSpeed, i * 5) * randomAmount;
	let posY = y + noise(counter * letterSpeed, -i * 7) * randomAmount;
	let angleVariance = randomAmount * 0.02;
	let theta = map(noise(counter * letterSpeed, i * 13), 0, 1, -angleVariance, angleVariance);
	
	push();
	translate(posX, posY);
	rotate(theta);
	text(c, 0, 0);
	pop();
}

function drawMessage2() {
	noStroke();
	fill(colMessage);
	let txtSize = min(width, height) * 0.1;
	textFont('monospace', txtSize);
	let message = "happy mother's day"
	textAlign(CENTER, CENTER);
	text(message, width / 2, height / 2);
}

function mouseClicked() {
	flowers.push(new Flower(mouseX, mouseY));
}

function petal (x, y, direction, length, width) {
	push();
	
	translate(x, y);
	rotate(direction);


	ellipse(length / 2, 0, length, width);
	pop();
}