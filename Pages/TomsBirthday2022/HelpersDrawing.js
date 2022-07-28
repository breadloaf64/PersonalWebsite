function render() {
	background(colBackground);
	
	if (gameState == 0) {
		noStroke();
		fill(0);
		textFont(font_pixel, width / 20);
		textAlign(CENTER, CENTER);
		text("Happy birthday tom!\n\ni made this game for you!\nsee if you can make it\nto 120 seconds\n\nclick to play!", width / 2, height / 2);
	}
	else if (gameState == 1) {
		push();
		translate(shakeOffset.x, shakeOffset.y);
		
		//drawTarget();
		drawFloor();
		cake.draw();
		drawArray(enemies);
		hero.draw();
		drawArray(destroyEffects);
		drawArray(textPopups);
		//drawMessage("happy father's day", height * 0.8, width * 0.05);
		
		pop();
		
		drawInstructions();
		drawScore();
		drawCombo();
		drawCakeHealth();
		drawTimer();
		
		if (millis() - gameStartTime > 120 * 1000) {
			drawMessage("You have saved the cake!", height * 0.4, width * 0.05);
		}
	}
	else if (gameState = 2) {
		noStroke();
		fill(0);
		textFont(font_pixel, width / 20);
		textAlign(CENTER, CENTER);
		text("The monsters have eaten your\nbirthday cake :(", width / 2, height * 0.4);
		textAlign(CENTER, BOTTOM);
		text("time: " + gameOverTime + "\nscore: " + score + "\nhighest combo: " + highestCombo, width / 2, height * 0.9);
	}
	
	drawFrame();
}

function drawFloor() {
	let scale = 6;
	noSmooth();
	let density = 5;
	for (let c = 0; c < density; c++) {
		for (let r = 0; r < density; r++) {
			let frame = floor(noise(r * 2 + c * 3 * 100) * imgs_floorTexture.length);
			let x = width / density * (c + 0.5) + (noise((r * 13 + c * 17) * 10) - 0.5) * width / density;
			let y = height / density * (r + 0.5) + (noise((r * 23 + c * 19) * 40) - 0.5) * width / density;
			image(imgs_floorTexture[frame], x, y, imgs_floorTexture[0].width * scale, imgs_floorTexture[0].height * scale);
			
		}
	}
}

function drawArray(arr) {
	for (let a of arr) {
		a.draw();
	}
}

function drawTarget() {
	noStroke();
	fill(0);
	ellipse(target.x, target.y, u);
}

var waveSpeed = 0.023;
var counter = 0;

function drawMessage(message, y, size) {
	noStroke();
	let letterSpace = size * 0.7;
	textFont(font_pixel, size);
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

var cleared = false;
var instructionAlpha = 255;

function drawInstructions() {
	noStroke();
	if(cleared) instructionAlpha-=5;
	fill(0, instructionAlpha);
	textFont(font_pixel, width / 20);
	textAlign(CENTER, TOP);
	text("tap to dash through enemies!\nprotect the cake", width / 2, height - u * 15);
}

function drawCakeHealth() {
	noStroke();
	fill(0);
	textFont(font_pixel, width / 30);
	textAlign(RIGHT, TOP);
	text("cake:", width - 42 * u, u * 5);
	
	fill("#a8e094");
	rect(width - 40 * u, u * 5, u * 35 * cake.hp / 100, u * 3);
	
	noFill();
	stroke(0);
	strokeWeight(2);
	rect(width - 40 * u, u * 5, u * 35, u * 3);
}

function drawScore() {
	noStroke();
	fill(0);
	textFont(font_pixel, width / 30);
	textAlign(LEFT, TOP);
	text("score: " + score, u * 5, u * 5);
}

function drawCombo() {
	noStroke();
	fill(0);
	textFont(font_pixel, width / 30);
	textAlign(LEFT, TOP);
	text("combo: " + combo, u * 5, u * 10);
}

function drawTimer() {
	noStroke();
	fill(0);
	textFont(font_pixel, width / 30);
	textAlign(LEFT, BOTTOM);
	let time = (millis() - gameStartTime) / 1000;
	text("time: " + floor(time) + nf(time - floor(time), 0, 2).substring(1), u * 5, height - u * 5);
}