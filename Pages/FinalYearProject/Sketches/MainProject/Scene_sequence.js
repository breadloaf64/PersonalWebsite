class Scene_sequence {
	constructor() {
		this.name = "sequence";
		this.paused = false;
		this.makeButtons();
		this.sequenceBox = new SequenceBox();
		this.sequenceBox.setSquare(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
	}
	
	setSequence(sequenceIndex) {
		this.sequence = sequences[sequenceIndex];
		this.sequenceBox.sequence = sequences[sequenceIndex];
		this.sequenceBox.col = colsSequenceBackgrounds[sequenceIndex];
	}
	
	makeButtons() {
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 5;
		const w = layout.subSecondarySquare_w;
		
		// stopStart button
		const thisScene = this;
		const stopStartButtonPressFunction = function() {
			stopStart();
		}
		this.btnStopStart = new Button(x, y + h * 0, w, h,
															 stopStartButtonPressFunction, "stop / start", txtSize, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		
		// quantise button
		const quantiseButtonPressFunction = function() {
			sequences[currentSequenceIndex].changeQuantisation();
		}
		this.btnQuantise = new Button(x, y + h * 1, w, h,
																	quantiseButtonPressFunction, "quantise", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		
		// new photo button
		const newPhotoButtonPressFunction = function() {
			stopPlaying();
			sequences[currentSequenceIndex].silence();
			changeScene(scene_takePhoto);
		}
		this.btnNewPhoto = new Button(x, y + h * 2, w, h,
																	newPhotoButtonPressFunction, "new photo", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		
		// back button
		const backButtonPressFunction = function() {
			sequences[currentSequenceIndex].silence();
			scene_main.makeSequenceBoxes();
			changeScene(scene_main);
		}
		this.btnBack = new Button(x, y + h * 3, w, h,
																	backButtonPressFunction, "back", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		
		// clear button
		const clearButtonPressFunction = function() {
			sequences[currentSequenceIndex].silence();
			sequences[currentSequenceIndex] = new Sequence();
			this.scene.setSequence(currentSequenceIndex);
		}
		this.btnClear = new Button(x, y + h * 4, w, h,
																	clearButtonPressFunction, "clear", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnClear.scene = thisScene;
		
		this.buttons = [this.btnStopStart, this.btnQuantise, this.btnNewPhoto, this.btnBack, this.btnClear];
	}
	
	windowResized() { // essential
		this.makeButtons();
		this.sequenceBox.setSquare(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		this.sequenceBox.draw();
		this.drawPauseScreen();
		this.drawButtons();
		image(imgNoiseTexture, 0, 0);
	}
	
	drawButtons() {
		for (let button of this.buttons) {
			button.draw();
		}
	}
	
	drawPauseScreen() {
		if (!playing) {
			// tint background darker
			noStroke();
			fill(0, 0, 0, 100);
			rect(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);

			fill(255);

			// draw instruction
			let txtSize = layout.subPrimarySquare_w / 12;
			textFont("monospace", txtSize);
			textAlign(CENTER, CENTER);
			let displayText = "not playing";
			text(displayText, layout.subPrimarySquare_x + layout.subPrimarySquare_w / 2, layout.subPrimarySquare_y + layout.subPrimarySquare_h / 2);
		}
	}
	
	mouseClicked() { // essential
		for (let button of this.buttons) {
			button.tryClick();
		}
	}
}