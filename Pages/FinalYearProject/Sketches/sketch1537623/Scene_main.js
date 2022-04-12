class Scene_main {
	constructor() {
		this.name = "main";
		
		this.makeSequenceBoxButtons();
		this.makeSequenceBoxes();
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
		
		// stop / start button
		const thisScene = this;
		let stopStartButtonText = "";
		if (playing) stopStartButtonText = "■";
		else stopStartButtonText = "▶";
		const stopStartButtonPressFunction = function() {
			stopStart();
			if (playing) this.text = "■";
			else this.text = "▶";
		}
		this.btnStopStart = new Button(x, y + h * 0, w, h,
															 stopStartButtonPressFunction, stopStartButtonText, txtSize, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		this.btnStopStart.scene = thisScene;
		
		// clear all button
		const clearAllButtonPressFunction = function() {
			for (let i = 0; i < 4; i++) {
				sequences[i].silence();
				setupSequences();
				this.scene.sequenceBoxes[i].sequence = sequences[i];
			}
		}
		this.btnClearAll = new Button(x, y + h * 2, w, h,
																	clearAllButtonPressFunction, "clear all", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnClearAll.scene = thisScene;
		
		this.buttons = [this.btnStopStart, this.btnClearAll];
	}
	
	makeSequenceBoxButtons() {
		this.sequenceBoxButtons = [];
		
		let xs = [layout.subSubPrimarySquareTL_x, layout.subSubPrimarySquareTR_x, layout.subSubPrimarySquareBL_x, layout.subSubPrimarySquareBR_x];
		let ys = [layout.subSubPrimarySquareTL_y, layout.subSubPrimarySquareTR_y, layout.subSubPrimarySquareBL_y, layout.subSubPrimarySquareBR_y];
		let ws = [layout.subSubPrimarySquareTL_w, layout.subSubPrimarySquareTR_w, layout.subSubPrimarySquareBL_w, layout.subSubPrimarySquareBR_w];
		let hs = [layout.subSubPrimarySquareTL_h, layout.subSubPrimarySquareTR_h, layout.subSubPrimarySquareBL_h, layout.subSubPrimarySquareBR_h];
		
		for (let i = 0; i < 4; i++) {
			this.makeSequenceBoxButton(sequences[i], xs[i], ys[i], ws[i], hs[i], i);
		}
	}
	
	makeSequenceBoxButton(sequence, x, y, w, h, sequenceIndex) {
		// font stuff irrelevant since other stuff will be rendered over the button
		const txtSize = 10;
		const typeface = "monospace";
		const text = "";
		textFont(typeface, txtSize);
		let colTransparent = color(0, 0);

		const buttonPressFunction = function() {
			buttonPressedThisFrame = true;
			currentSequenceIndex = sequenceIndex;
			if (sequences[sequenceIndex].voices.length == 0) { // if sequence is clear, take photo
				changeScene(scene_takePhoto);
			}
			else {
				scene_sequence.setSequence(sequenceIndex);
				changeScene(scene_sequence);
			}
			//print(sequenceIndex);
		}
		
		this.sequenceBoxButtons.push(new Button(x, y, w, h,
																		 buttonPressFunction, text, txtSize, typeface,
															 colTransparent, colTransparent, colTransparent));
	}
	
	makeSequenceBoxes() {
		let xs = [layout.subSubPrimarySquareTL_x, layout.subSubPrimarySquareTR_x, layout.subSubPrimarySquareBL_x, layout.subSubPrimarySquareBR_x];
		let ys = [layout.subSubPrimarySquareTL_y, layout.subSubPrimarySquareTR_y, layout.subSubPrimarySquareBL_y, layout.subSubPrimarySquareBR_y];
		let ws = [layout.subSubPrimarySquareTL_w, layout.subSubPrimarySquareTR_w, layout.subSubPrimarySquareBL_w, layout.subSubPrimarySquareBR_w];
		let hs = [layout.subSubPrimarySquareTL_h, layout.subSubPrimarySquareTR_h, layout.subSubPrimarySquareBL_h, layout.subSubPrimarySquareBR_h];
		
		this.sequenceBoxes = [];
		for (let i = 0; i < 4; i++) {
			let sb = new SequenceBox();
			sb.sequence = sequences[i];
			sb.instrumentIcon = instrumentIcons[i];
			sb.setSquare(xs[i], ys[i], ws[i], hs[i]);
			sb.col = colsSequenceBackgrounds[i];
			sb.showGrid = false;
			this.sequenceBoxes.push(sb);
		}
	}
	
	windowResized() { // essential
		this.makeSequenceBoxButtons();
		this.makeButtons();
		this.makeSequenceBoxes();
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		//layout.draw();
		this.drawSequenceBoxes();
		this.drawButtons();
		image(imgNoiseTexture, 0, 0);
	}
	
	drawSequenceBoxes() {
		for (let sequenceBox of this.sequenceBoxes) {
			sequenceBox.draw();
		}
	}
	
	drawButtons() {
		for (let button of this.buttons) {
			button.draw();
		}
	}

	mouseClicked() { // essential
		for (let sequenceBoxButton of this.sequenceBoxButtons) {
			sequenceBoxButton.tryClick();
		}
		for (let button of this.buttons) {
			button.tryClick();
		}
	}
}