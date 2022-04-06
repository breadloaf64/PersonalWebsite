class Scene_setThreshold {
	constructor() {
		this.name = "setThreshold";
		this.makeRetakePhotoButton();
		this.makeConvertToSequenceButton();
		this.threshold = 0.5;
	}

	windowResized() { // essential
		this.makeConvertToSequenceButton();
		this.makeRetakePhotoButton();
	}

	mainLoop() { // essential
		if (mouseIsPressed & mouseIsOnScreen() & !buttonPressedThisFrame & mouseY < this.btnConvertToSequence.y) {
			this.threshold = map(mouseY, 0, this.btnConvertToSequence.y, 0, 1, true);
		}
	}

	render() { // essential
		let filtered = copyImage(photo);
		filtered.filter(THRESHOLD, this.threshold);
		drawImage(photo, capSquareX, capSquareY, capSquareL, capSquareL);
		this.btnRetakePhoto.draw();
		this.btnConvertToSequence.draw();

		// DEBUG STUFF
		// debug rect
		strokeWeight(3);
		stroke(255, 0, 0);
		noFill();
		rect(capSquareX, capSquareY, capSquareL, capSquareL);

		// font formatting
		fill(0);
		noStroke();
		let txtSize = width / 30;
		textFont("monospace", txtSize);

		text("canvas size: " + width + ", " + height, width / 11, width / 11 + 0 * txtSize * 1.3);
		text("image size: " + filtered.width + ", " + filtered.height, width / 11, width / 11 + 1 * txtSize * 1.3);
	}

	mouseClicked() { // essential
		this.btnRetakePhoto.tryClick();
		this.btnConvertToSequence.tryClick();
	}

	makeRetakePhotoButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = "retake photo";

		textFont(typeface, txtSize);

		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;


		const buttonPressFunction = function() {
			buttonPressedThisFrame = true;
			changeScene(scene_takePhoto);
		}

		this.btnRetakePhoto = new Button(20, height - btnHeight - 20, btnWidth, btnHeight,
																		 buttonPressFunction, text, txtSize, typeface,
															 colButtonFill, colButtonBorder, colButtonText);
	}

	makeConvertToSequenceButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = "convert to sequence";

		textFont(typeface, txtSize);

		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;


		const buttonPressFunction = function() {
			buttonPressedThisFrame = true;

			let thresholded = get(capSquareX, capSquareY, capSquareL, capSquareL);
			// thresholded.save('filtered', 'png');

			// get thresholded image, convert to sequence
			scene_sequence.sequence = convertImageToSequence2(thresholded);

			changeScene(scene_sequence);
		}

		this.btnConvertToSequence = new Button(width - btnWidth - 20, height - btnHeight - 20, btnWidth, btnHeight,
																		 buttonPressFunction, text, txtSize, typeface,
															 colButtonFill, colButtonBorder, colButtonText);
	}
}
