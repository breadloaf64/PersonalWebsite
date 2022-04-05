class Scene_sequence {
	constructor() {
		this.name = "sequence";
		this.playHead = new PlayHead();
		this.paused = false;
		this.makeQuantiseButton();
		this.makePauseButton();
		this.makeNewPhotoButton();
	}
	
	makePauseButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = " pause ";
		
		textFont(typeface, txtSize);
		
		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;
		
		const scene = this;
		const buttonPressFunction = function() {
			scene.pauseUnPause();
		}
		
		this.btnPause = new Button(width - btnWidth - 20, height - btnHeight - 20, btnWidth, btnHeight,
															 buttonPressFunction, text, txtSize, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		this.btnPause.scene = scene;
	}
	
	pauseUnPause() {
		this.paused = !this.paused;
		if (!this.paused) {

		}
		else {
			this.sequence.silence();
		}
	}
	
	makeQuantiseButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = "quantise";
		
		textFont(typeface, txtSize);
		
		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;
		
		const sequence = this.sequence;
		const buttonPressFunction = function() {
			currentScene.sequence.changeQuantisation();
		}
		this.btnQuantise = new Button(20, height - btnHeight - 20, btnWidth * 1.3, btnHeight,
																	buttonPressFunction, text, txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
	}
	
	makeNewPhotoButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = "new photo";
		
		textFont(typeface, txtSize);
		
		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;
		
		const buttonPressFunction = function() {
			currentScene.sequence.silence();
			changeScene(scene_takePhoto);
		}
		this.btnNewPhoto = new Button(width / 2 - btnWidth / 2, height - btnHeight - 20, btnWidth * 1.3, btnHeight,
																	buttonPressFunction, text, txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
	}
	
	windowResized() { // essential
		this.makeQuantiseButton();
		this.makePauseButton();
		this.makeNewPhotoButton();
		this.sequence.setBox(capSquareX, capSquareY, capSquareL);
		this.playHead.setBox(capSquareX, capSquareY, capSquareL);
	}
	
	mainLoop() { // essential
		if (!this.paused) {
			this.playHead.advance();
			this.handleSound();
		}
	}
	
	render() { // essential
		this.drawGrid();
		this.sequence.draw();
		this.playHead.draw();
		this.drawCapSquare();
		this.drawPauseScreen();
		this.btnPause.draw();
		this.btnQuantise.draw();
		this.btnNewPhoto.draw();
	}
	
	drawGrid() {
		stroke(colGrid);
		strokeWeight(1);

		// vertical lines;
		for (let i = 0; i < numQuantisedBeats; i++) {
			let x = map(i, 0, numQuantisedBeats, capSquareX, capSquareX + capSquareL);
			line(x, capSquareY, x, capSquareY + capSquareL);
		}

		// horizontal lines;
		let originNote = 0; // lines will appear each octave where this note appears
		for (let note = minNote; note <= maxNote; note++) {
			if (this.posMod((note - originNote), 12) == 0) {
				let y = map(frequencyToProp_exp(noteToFrequency(note)), 0, 1, capSquareY + capSquareL, capSquareY);
				line(capSquareX, y, capSquareX + capSquareL, y);
			}
		}
	}
	
	posMod(a, b) {
		// returns how far a is from the closest lower multiple of b
		let result = a % b;
		if (result < 0) result += b;
		return result;
	}
	
	drawCapSquare() {
		stroke(colCapSquare);
		strokeWeight(5);
		noFill();

		rect(capSquareX, capSquareY, capSquareL, capSquareL);
	}
	
		drawPauseScreen() {
		if (this.paused) {
			// tint background darker
			noStroke();
			fill(0, 0, 0, 100);
			rect(capSquareX, capSquareY, capSquareL, capSquareL);

			fill(255);

			// draw instruction
			let txtSize = capSquareL / 12;
			textFont("monospace", txtSize);
			let displayText = "paused";
			let txtWidth = textWidth(displayText);
			text(displayText, capSquareX + (capSquareL - txtWidth) / 2, capSquareY + capSquareL * 0.5);
		}
	}
	
	mouseClicked() { // essential
		this.btnPause.tryClick();
		this.btnQuantise.tryClick();
		this.btnNewPhoto.tryClick();
	}
	
	handleSound() {
		this.sequence.play(this.playHead.position);
	}
}