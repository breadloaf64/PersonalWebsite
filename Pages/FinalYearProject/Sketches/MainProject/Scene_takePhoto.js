class Scene_takePhoto {
	constructor() {
		this.name = "takePhoto";
		this.camera = new Camera();
		this.makeFlipCameraButton();
		this.makeTakePhotoButton();
	}
	
	windowResized() { // essential
		this.camera.setupCapture();
		this.makeFlipCameraButton();
		this.makeTakePhotoButton();
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		drawImage(this.camera.currentImage(), 0, 0, w, h);
		this.drawTranslucentMask();
		this.drawCapSquare();
		this.btnFlipCamera.draw();
		this.btnTakePhoto.draw();
	}
	
	drawCapSquare() {
		stroke(colCapSquare);
		strokeWeight(5);
		noFill();

		rect(capSquareX, capSquareY, capSquareL, capSquareL);
	}
	
	drawTranslucentMask() {
		noStroke();
		fill(255, 180);
		inverseRect(capSquareX, capSquareY, capSquareL, capSquareL);
	}
	
	mouseClicked() { // essential
		this.btnFlipCamera.tryClick();
		this.btnTakePhoto.tryClick();
	}

	
	makeFlipCameraButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = "flip camera";
		
		textFont(typeface, txtSize);
		
		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;
		
		const buttonPressFunction = function() {
			this.camera.flip();
			buttonPressedThisFrame = true;
		}
		
		this.btnFlipCamera = new Button(20, height - btnHeight - 20, btnWidth, btnHeight,
																		 buttonPressFunction, text, txtSize, typeface,
															 colButtonFill, colButtonBorder, colButtonText);
		
		this.btnFlipCamera.camera = this.camera;
	}

	makeTakePhotoButton() {
		const txtSize = width / 30;
		const typeface = "monospace";
		const text = "take photo";
		
		textFont(typeface, txtSize);
		
		const btnHeight = txtSize * 2;
		const btnWidth = textWidth(text) * 1.1;
		
		const buttonPressFunction = function() {
			takePhoto();
			changeScene(scene_setThreshold);
			buttonPressedThisFrame = true;
		}
		
		this.btnTakePhoto = new Button(width - btnWidth - 20, height - btnHeight - 20, btnWidth, btnHeight,
																		 buttonPressFunction, text, txtSize, typeface,
															 colButtonFill, colButtonBorder, colButtonText);
	}
}