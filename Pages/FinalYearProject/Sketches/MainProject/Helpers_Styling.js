var imgNoiseTexture;

function setColours() {
	// scene_title
	colTitleText = color(0);
	colSubtitleText = color(0);
	
	colBackground = color("#f0ead2");
	
	colCapSquare = color("#a98467");
	
	colButtonFill = color("#f0ead2");
	colButtonBorder = color("#adc178");
	colButtonText = color("#6c584c");
	
	//colReadout = color("#000000");
	colGrid = color("#dde5b6");
	colPlayHead = color("#adc178");
	colVoice = color("#6c584c");
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
	strokeWeight(30);
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
		createCanvas(100, 100);

		try {
			canvas.parent('sketch-holder');
		}
		catch {}
	}
	else {
		createCanvas(windowWidth, windowHeight);
	}
	windowResized();
}