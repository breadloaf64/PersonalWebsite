class Scene_takePhoto {
	constructor() {
		this.name = "takePhoto";
		this.camera = new Camera();
		this.makeButtons();
	}
	
	makeButtons() {
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 4;
		const w = layout.subSecondarySquare_w;
		
		// flip camera
		const flipCameraButtonPressFunction = function() {
			this.camera.flip();
			buttonPressedThisFrame = true;
		}
		this.btnFlipCamera = new Button(x, y + h * 0, w, h,
															 flipCameraButtonPressFunction, "flip camera", txtSize, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		this.btnFlipCamera.camera = this.camera;
		
		
		// take photo
		const takePhotoButtonPressFunction = function() {
			takePhoto();
			changeScene(scene_setThreshold);
			buttonPressedThisFrame = true;
		}
		this.btnQuantise = new Button(x, y + h * 1, w, h,
																	takePhotoButtonPressFunction, "take photo", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		
		// cancel and return to previous scene
		const cancelButtonPressFunction = function() {
			if (sequences[currentSequenceIndex].voices.length == 0) {
				changeScene(scene_main);
			}
			else changeScene(scene_sequence);
		}
		this.btnCancel = new Button(x, y + h * 2, w, h,
																	cancelButtonPressFunction, "cancel", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		
		this.buttons = [this.btnFlipCamera, this.btnQuantise, this.btnCancel];
	}
	
	windowResized() { // essential
		this.camera.setupCapture();
		this.makeButtons();
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		drawImage(this.camera.currentImage(), layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
		this.drawTranslucentMask();
		//this.drawCapSquare();
		this.drawOuterCapSquare();
		this.drawButtons();
		image(imgNoiseTextureCut, 0, 0);
	}
	
	drawCapSquare() {
		stroke(colCapSquare);
		strokeWeight(5);
		noFill();

		rect(layout.subSubPrimarySquare_x, layout.subSubPrimarySquare_y, layout.subSubPrimarySquare_w, layout.subSubPrimarySquare_h);
	}
	
	drawOuterCapSquare() {
		stroke(colOuterCapSquare);
		strokeWeight(5);
		noFill();

		rect(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
	}
	
	drawTranslucentMask() {
		noStroke();
		fill(255, 180);
		inverseRect(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h, layout.subSubPrimarySquare_x, layout.subSubPrimarySquare_y, layout.subSubPrimarySquare_w, layout.subSubPrimarySquare_h);
	}
	
	drawButtons() {
		for (let button of this.buttons) {
			button.draw();
		}
	}
	
	mouseClicked() { // essential
		for (let button of this.buttons) {
			button.tryClick();
		}
	}
}