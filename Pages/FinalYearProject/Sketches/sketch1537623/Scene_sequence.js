class Scene_sequence {
	constructor() {
		this.name = "sequence";
		this.paused = false;
		this.makeButtons();
		this.sequenceBox = new SequenceBox();
		this.sequenceBox.setSquare(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
		this.currentPanelIndex = 0 // 0 is edit, 1 is pitch, 2 is time
	}
	
	setSequence(sequenceIndex) {
		this.sequence = sequences[sequenceIndex];
		this.sequenceBox.sequence = sequences[sequenceIndex];
		this.sequenceBox.col = colsSequenceBackgrounds[sequenceIndex];
	}
	
	makeButtons() {
		this.makeButtonsMain();
		this.makeButtonsEdit();
		this.makeButtonsPitch();
		this.makeButtonsTime();
		this.buttonPanels = [this.buttons_edit, this.buttons_pitch, this.buttons_time];
	}
	
	makeButtonsMain() {
		this.buttons_main = [];
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 6;
		const w = layout.subSecondarySquare_w;
		const thisScene = this;
		
		// stopStart button
		let stopStartButtonText = "";
		if (playing) stopStartButtonText = "■";
		else stopStartButtonText = "▶";
		const stopStartButtonPressFunction = function() {
			stopStart();
			if (playing) this.text = "■";
			else this.text = "▶";
		}
		this.btnStopStart = new Button(x, y + h * 0, w / 2, h,
															 stopStartButtonPressFunction, stopStartButtonText, txtSize, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		this.buttons_main.push(this.btnStopStart);
		
		// back button
		const backButtonPressFunction = function() {
			sequences[currentSequenceIndex].silence();
			scene_main.makeSequenceBoxes();
			changeScene(scene_main);
		}
		this.btnBack = new Button(x + w / 2, y + h * 0, w / 2, h,
																	backButtonPressFunction, "back", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.buttons_main.push(this.btnBack);
		
		this.selectPanelButtons = [];
		
		// select panel edit button
		const selectPanelEditButtonPressFunction = function() {
			this.scene.currentPanelIndex = 0;
			this.scene.updateSelectedPanelTab();
		}
		this.btnSelectPanelEdit = new Button(x + w / 3 * 0, y + h * 1.5, w * 0.32, h / 2,
																	selectPanelEditButtonPressFunction, "edit", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnSelectPanelEdit.scene = thisScene;
		this.buttons_main.push(this.btnSelectPanelEdit);
		this.selectPanelButtons.push(this.btnSelectPanelEdit);
				
		// select panel pitch button
		const selectPanelPitchButtonPressFunction = function() {
			this.scene.currentPanelIndex = 1;
			this.scene.updateSelectedPanelTab();
		}
		this.btnSelectPanelPitch = new Button(x + w / 3 * 1, y + h * 1.5, w * 0.32, h / 2,
																	selectPanelPitchButtonPressFunction, "pitch", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnSelectPanelPitch.scene = thisScene;
		this.buttons_main.push(this.btnSelectPanelPitch);
		this.selectPanelButtons.push(this.btnSelectPanelPitch);
				
		// select panel time button
		const selectPanelTimeButtonPressFunction = function() {
			this.scene.currentPanelIndex = 2;
			this.scene.updateSelectedPanelTab();
		}
		this.btnSelectPanelTime = new Button(x + w / 3 * 2, y + h * 1.5, w * 0.32, h / 2,
																	selectPanelTimeButtonPressFunction, "time", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnSelectPanelTime.scene = thisScene;
		this.buttons_main.push(this.btnSelectPanelTime);
		this.selectPanelButtons.push(this.btnSelectPanelTime);
		
		// panel border
		this.panelBorder = new Button(x, y + h * 2, w, h * 4,
																	function(){}, "", txtSize, typeface,
																 colTransparent, colButtonBorder, colButtonText);
		this.buttons_main.push(this.panelBorder);
		
		this.updateSelectedPanelTab();
	}
	
	updateSelectedPanelTab() {
		for (let i = 0; i < 3; i++) {
			if (i == this.currentPanelIndex) {
				this.selectPanelButtons[i].colBorder = colButtonBorder;
				this.selectPanelButtons[i].colFill = colButtonFill;
			}
			else {
				this.selectPanelButtons[i].colBorder = colTransparent;
				this.selectPanelButtons[i].colFill = colButtonFillInactive;
			}
		}
	}
	
	makeButtonsEdit() {
		this.buttons_edit = [];
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 6;
		const w = layout.subSecondarySquare_w;
		const thisScene = this;
		
		// new photo button
		const newPhotoButtonPressFunction = function() {
			stopPlaying();
			sequences[currentSequenceIndex].silence();
			changeScene(scene_takePhoto);
		}
		this.btnNewPhoto = new Button(x, y + h * 2, w, h,
																	newPhotoButtonPressFunction, "new photo", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.buttons_edit.push(this.btnNewPhoto);
		
		// clear button
		const clearButtonPressFunction = function() {
			sequences[currentSequenceIndex].silence();
			sequences[currentSequenceIndex] = new Sequence();
			this.scene.setSequence(currentSequenceIndex);
		}
		this.btnClear = new Button(x, y + h * 3, w, h,
																	clearButtonPressFunction, "clear", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnClear.scene = thisScene;
		this.buttons_edit.push(this.btnClear);
	}
	
	makeButtonsPitch() {
		this.buttons_pitch = [];
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 6;
		const w = layout.subSecondarySquare_w;
		const thisScene = this;
		
		// snap pitch text
		this.txtSnapPitch = new Button(x, y + h * 2, w / 2, h,
																function(){}, "snap pitch", txtSize, typeface,
																 colTransparent, colTransparent, colButtonText);
		this.buttons_pitch.push(this.txtSnapPitch);
		
		// toggle snap pitch button
		let toggleSnapPitchText = "";
		if (sequences[currentSequenceIndex].quantisePitch) toggleSnapPitchText = "☑";
		else toggleSnapPitchText = "☐";
		const toggleSnapPitchButtonPressFunction = function() {
			sequences[currentSequenceIndex].toggleQuantisePitch();
			if (sequences[currentSequenceIndex].quantisePitch) this.text = "☑";
			else this.text = "☐";
		}
		this.btnToggleSnapPitch = new Button(x + w / 2, y + h * 2, w / 2, h,
																toggleSnapPitchButtonPressFunction, toggleSnapPitchText, txtSize, typeface,
																 colTransparent, colTransparent, colButtonText);
		this.btnToggleSnapPitch.scene = thisScene;
		this.buttons_pitch.push(this.btnToggleSnapPitch);
	}
	
	makeButtonsTime() {
		this.buttons_time = [];
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 6;
		const w = layout.subSecondarySquare_w;
		const thisScene = this;
		
		// snap time text
		this.txtSnapTime = new Button(x, y + h * 2, w / 2, h,
																function(){}, "snap time", txtSize, typeface,
																 colTransparent, colTransparent, colButtonText);
		this.buttons_time.push(this.txtSnapTime);
		
		// toggle snap time button
		let toggleSnapTimeText = "";
		if (sequences[currentSequenceIndex].quantiseTime) toggleSnapTimeText = "☑";
		else toggleSnapTimeText = "☐";
		const toggleSnapTimeButtonPressFunction = function() {
			sequences[currentSequenceIndex].toggleQuantiseTime();
			if (sequences[currentSequenceIndex].quantiseTime) this.text = "☑";
			else this.text = "☐";
		}
		this.btnToggleSnapTime = new Button(x + w / 2, y + h * 2, w / 2, h,
																toggleSnapTimeButtonPressFunction, toggleSnapTimeText, txtSize, typeface,
																 colTransparent, colTransparent, colButtonText);
		this.btnToggleSnapTime.scene = thisScene;
		this.buttons_time.push(this.btnToggleSnapTime);
		
		// length text box
		this.txtLength = new Button(x, y + h * 3, w / 2, h,
																function(){}, "length", txtSize, typeface,
																colTransparent, colTransparent, colButtonText);
		this.buttons_time.push(this.txtLength);
		
		// numBeats text box
		this.txtNumBeats = new Button(x + w/2, y + h * 3, w / 4, h,
																function(){}, sequences[currentSequenceIndex].numBeats, txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.buttons_time.push(this.txtNumBeats);
			
		// increase beats
		const increaseBeatsButtonPressFunction = function() {
			this.scene.sequence.setNumBeats(this.scene.sequence.numBeats + 1);
			this.scene.txtNumBeats.text = this.scene.sequence.numBeats.toString();
		}
		this.btnIncreaseBeats = new Button(x + 3 * w / 4, y + h * 3, w / 4, h / 2,
																increaseBeatsButtonPressFunction, "▲", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnIncreaseBeats.scene = thisScene;
		this.buttons_time.push(this.btnIncreaseBeats);
		
		// decrease beats
		const decreaseBeatsButtonPressFunction = function() {
			this.scene.sequence.setNumBeats(max(1, this.scene.sequence.numBeats - 1));
			this.scene.txtNumBeats.text = this.scene.sequence.numBeats.toString();
		}
		this.btnDecreaseBeats = new Button(x + 3 * w / 4, y + h * 3 + h/2, w / 4, h / 2,
																decreaseBeatsButtonPressFunction, "▼", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnDecreaseBeats.scene = thisScene;
		this.buttons_time.push(this.btnDecreaseBeats);
	}
	
	windowResized() { // essential
		this.makeButtons();
		this.sequenceBox.setSquare(layout.subPrimarySquare_x, layout.subPrimarySquare_y, layout.subPrimarySquare_w, layout.subPrimarySquare_h);
	}
	
	mainLoop() { // essential
	}
	
	render() { // essential
		this.sequenceBox.draw();
		//this.drawPauseScreen();
		this.drawButtons();
		image(imgNoiseTexture, 0, 0);
	}
	
	drawButtons() {
		// draw main buttons
		for (let button of this.buttons_main) {
			button.draw();
		}
		
		// draw panel buttons
		for (let button of this.buttonPanels[this.currentPanelIndex]) {
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
		// register main button clicks
		for (let button of this.buttons_main) {
			button.tryClick();
		}
		
		// register panel button clicks
		for (let button of this.buttonPanels[this.currentPanelIndex]) {
			button.tryClick();
		}
	}
}