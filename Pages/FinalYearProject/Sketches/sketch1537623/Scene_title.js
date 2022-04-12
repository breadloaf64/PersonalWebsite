class Scene_title {
	constructor() {
		this.name = "title";
	}
	
	windowResized() { // essential
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		this.renderText();
		this.renderImages();
		//layout.draw();
		image(imgNoiseTexture, 0, 0);
	}
	
	renderImages() {
		let size = min(width, height) / 8;
		let theta = map(sin(millis() / 200), -1, 1, -0.1, 0.1);
		this.centeredImage(img_emoji_musicnote, width / 2 + size / 2, height * 0.53, size, theta);
		this.centeredImage(img_emoji_pencil, width / 2 - size / 2, height * 0.53, size, -theta);
	}
	
	centeredImage(img, x, y, size, theta) {
		push();
		translate(x, y);
		rotate(theta);
		image(img, - size / 2, - size / 2, size, size);
		pop();
	}
	
	renderText() {
		const titleText = "draw music!\n";
		const subtitleText = "tap to play";
		
		// animation
		let multiplier = map(sin(millis() / 200), -1, 1, 1, 1.05);
		
		// main title
		let txtSize = min(width, height) / 10;
		const typeface = "monospace";
		textFont(typeface, txtSize * multiplier);
		textAlign(CENTER, CENTER);
		noStroke();
		fill(colTitleText);

		text(titleText, width / 2, height * 0.4);
		
		// subtitle
		txtSize *= 0.4;
		textFont(typeface, txtSize);
		fill(colSubtitleText);
		
		text(subtitleText, width / 2, height * 0.43);
	}
	
	mouseClicked() { // essential
		currentScene = scene_main;
	}
}