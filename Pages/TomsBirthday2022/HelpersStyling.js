var imgNoiseTexture;

function setColours() {
	colFrame = color("#22223B");
	colBackground = color("#9A8C98");
	colMessage = color("#000000");
}

function setNoiseTexture() {
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
	imgNoiseTexture = img;
}

function drawFrame() {
	strokeWeight(u * 5);
	stroke(colFrame);
	noFill();
	rect(0, 0, width, height);
}

function myStandardSetup() {
	setCanvas();
	createMetaTag();
	setColours();
	setNoiseTexture();
	pixelDensity(1);
}

function setCanvas () {
	if (embeddedOnWebsite) {
		// Move the canvas so it’s inside our <div id="sketch-holder">.
		let canvas = createCanvas(100, 100);

		try {
			canvas.parent('sketch-holder');
		}
		catch {print("failed to parent")}
		windowResized();
	}
	else {
		let size = min(windowWidth, windowHeight) * 0.8;
		createCanvas(size, size);
		w = size;
		h = size;
	}
}
