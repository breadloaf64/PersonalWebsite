function drawGrid() {
	
	// formatting
	stroke(colGrid);
	strokeWeight(1);
	noFill();
	
	let n = 4; // we will draw 2n lines across the grid
	let dist = width / (2 * n);
	
	for (let i = -n; i < n; i++) {
		let p = width / 2 + i * dist;
		line(p, 0, p, height); // vertical
		line(0, p, width, p); // horizontal
	}
}

function drawWave() {
	stroke(colWave);
	strokeWeight(5);
	noFill();
	
	let drawAmplitude = map(volume, 0, 1, 0, height / 2 * 0.8);
	let drawFrequency = map(frequency, minFrequency, maxFrequency, 0.015, 0.4, true);
	
	let samples = 80; // twice this many vertices will be used to draw the wave
	
	// forwards from centre
	beginShape();
	vertex(width / 2, height / 2);
	for (let i = -samples; i < samples; i++) {
		let x = width / 2 + map(i, 0, samples - 1, 0, width / 2);
		let y = height / 2 + sin((x - width / 2)  * drawFrequency) * drawAmplitude;

		// add noise
		pointOffset = map(volume, 0, 1, 3, 6);
		noisePeriod = 1 / frequency;
		noiseZOffset = sin(counter / noisePeriod * TWO_PI);
		
		x += noise(x, y, noiseZOffset) * pointOffset;
		y += noise(x, y + 100, noiseZOffset) * pointOffset;
		
		curveVertex(x, y);
	}
	endShape();
}

function drawCrosshair() {
	stroke(colCrosshair);
	strokeWeight(3);
	
	line(0, currentMouseY, width, currentMouseY); // horizontal
	line(currentMouseX, 0, currentMouseX, height); // vertical
}

function drawReadouts() {
	
	// font formatting
	fill(colReadouts);
	noStroke();
	txtSize = width / 30;
	textFont("monospace", txtSize);
	//textStyle(BOLD);
	
	let txtFrequency = frequency.toFixed(2);
	let txtVolume = (volume * 100).toFixed(2);
	
	text("Frequency: " + txtFrequency + " Hz", 20, height - 20);
	text("Volume: " + txtVolume + " %", 20, height - 20 - txtSize);
}

function drawPauseScreen() {
	if (pause) {
		noStroke();
		fill(0, 0, 0, 100);
		rect(0, 0, width, height);
		
		fill(255);
		noStroke();
		txtSize = width / 3;
		textFont("monospace", txtSize);
		textStyle(BOLD);
		let txtWidth = textWidth("||");
		
		text("||", (width - txtWidth) / 2, height * 0.6);
	}
}