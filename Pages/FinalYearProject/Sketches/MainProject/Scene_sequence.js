class Scene_sequence {
	constructor() {
		this.name = "sequence";
		this.paused = false;
		this.makeButtons();
		this.sequenceBox = new SequenceBox();
		this.sequenceBox.showIcon = false;
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
		this.btnStopStart = new Button(x, y + h * 0, w / 3 * 2, h,
															 stopStartButtonPressFunction, stopStartButtonText, txtSize, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		this.buttons_main.push(this.btnStopStart);
		
		// back button
		const backButtonPressFunction = function() {
			sequences[currentSequenceIndex].silence();
			scene_main.makeSequenceBoxes();
			changeScene(scene_main);
		}
		this.btnBack = new Button(x + w / 3 * 2, y + h * 0, w / 3, h,
																	backButtonPressFunction, "home", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.buttons_main.push(this.btnBack);
		
		this.selectPanelButtons = [];
		
		// select panel edit button
		const selectPanelEditButtonPressFunction = function() {
			this.scene.currentPanelIndex = 0;
			this.scene.updateSelectedPanelTab();
		}
		this.btnSelectPanelEdit = new Button(x + w / 3 * 0, y + h * 1.5, w * 0.32, h / 2,
																	selectPanelEditButtonPressFunction, "sequence", txtSize, typeface,
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
		
		// if current sequence is the drum sequence
		if (sequences[currentSequenceIndex].type == 3) {
			// move out of pitch tab
			if (this.currentPanelIndex == 1) {
				this.currentPanelIndex == 0;
			}
			this.btnSelectPanelPitch.f = function(){};
			this.btnSelectPanelPitch.colFill = colTransparent;
			this.btnSelectPanelPitch.colBorder = colTransparent;
			this.btnSelectPanelPitch.colText = colTransparent;
		}
		
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
																 colPanelBackground, colButtonBorder, colButtonText);
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
		// make sure pitch tab is hidden if on rhythm track
		if (sequences[currentSequenceIndex].type == 3) {
			this.btnSelectPanelPitch.colFill = colTransparent;
		}
	}
	
	makeButtonsEdit() {
		this.buttons_edit = [];
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		// w and h are smaller to allow for padding from the panel border
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const w = layout.subSecondarySquare_w * 1;
		const h = layout.subSecondarySquare_h * 1 / 6;
		
		const thisScene = this;
		
		const medScalar = 0.9;
		const medW = w * medScalar;
		const medH = h * medScalar;
		const medTxtSize = txtSize * medScalar;
		
		const smallScalar = 0.7;
		const smallW = w * smallScalar;
		const smallH = h * smallScalar;
		const smallTxtSize = txtSize * smallScalar;
		
		// new photo button
		const newPhotoButtonPressFunction = function() {
			stopPlaying();
			sequences[currentSequenceIndex].silence();
			changeScene(scene_takePhoto);
		}
		this.btnNewPhoto = new Button(x + (w - medW) / 2, y + h * 2 + (h - medH) / 2, medW, medH,
																	newPhotoButtonPressFunction, "new photo", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.buttons_edit.push(this.btnNewPhoto);
		
		// clear button
		const clearButtonPressFunction = function() {
			sequences[currentSequenceIndex].silence();
			let prevType = sequences[currentSequenceIndex].type;
			sequences[currentSequenceIndex] = new Sequence();
			sequences[currentSequenceIndex].setType(prevType);
			this.scene.setSequence(currentSequenceIndex);
		}
		this.btnClear = new Button(x + (w - smallW) / 2, y + h * 5 + (h - smallH) / 2, smallW, smallH,
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
		
		// preset text
		this.btnPresetScale = new Button(x, y + h * 3, w / 3, h,
																function(){}, "scale", txtSize, typeface,
																 colTransparent, colTransparent, colButtonText);
		this.btnPresetScale.scene = thisScene;
		this.buttons_pitch.push(this.btnPresetScale);
		
		// scale preset button
		let presetText = "x";
		if (this.sequence) presetText = getScaleName(this.sequence.scaleIndex);
		const presetScaleButtonPressFunction = function() {
			sequences[currentSequenceIndex].tickScaleIndex();
			this.scene.btnPresetScale.text = getScaleName(sequences[currentSequenceIndex].scaleIndex);
			this.scene.setSNStates();
		}
		this.btnPresetScale = new Button(x + w / 3, y + h * 3, w * 2 / 3 * 0.9, h * 0.95,
																presetScaleButtonPressFunction, presetText, txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnPresetScale.scene = thisScene;
		this.buttons_pitch.push(this.btnPresetScale);
		
		// scale note buttons
		this.snButtons = [];
		const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
		
		//scale note panel
		const snpW = w * 0.7;
		const snpH = h * 2 * 0.9;
		const snpX = x + (w - snpW) / 2;
		const snpY = y + h * 4.1;
		
		const snW = snpW / 4;
		const snH = snpH / 3;
		
		for (let i = 0; i < 12; i++) {
			// coordinate of button on panel
			let x = i % 4;
			let y = floor(i / 4);
			
			// coordinate of button on page
			let snX = snpX + x * snW;
			let snY = snpY + y * snH;
			
			let snButtonPressFunction = function() {
				if (this.selected) {
					this.selected = false;
					this.colFill = colSNButtonFillUnselected;
				}
				else {
					this.selected = true;
					this.colFill = colSNButtonFillSelected;
				}
				sequences[currentSequenceIndex].scaleIndex = -1;
				this.scene.btnPresetScale.text = getScaleName(-1);
				this.scene.updateScaleFromSNButtons();
			}
			
			let btnSN = new Button(snX, snY, snW, snH,
																snButtonPressFunction, notes[i], txtSize * 0.8, typeface,
																 colSNButtonFillUnselected, colButtonBorder, colButtonText);
			btnSN.selected = false;
			btnSN.id = i;
			btnSN.scene = thisScene;
			
			this.snButtons.push(btnSN);
			this.buttons_pitch.push(btnSN);
		}
		this.setSNStates();
	}
	
	setSNStates() {
		// deselect all
		for (let btnSN of this.snButtons) {
			btnSN.selected = false;
			btnSN.colFill = colSNButtonFillUnselected;
		}
		
		let scale = sequences[currentSequenceIndex].scale;
		let tonic = scale.tonic;

		for (let degree of scale.degrees) {
			let i = (tonic + degree) % 12; // convert note to index of panel button
			this.snButtons[i].selected = true;
			this.snButtons[i].colFill = colSNButtonFillSelected;
		}
	}
	
	updateScaleFromSNButtons() {
		let tonic = 0;
		let degrees = [];
		for (let i = 0; i < 12; i++) {
			if (this.snButtons[i].selected) degrees.push(i);
		}
		sequences[currentSequenceIndex].setScale(new Scale(tonic, degrees));
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
		
		// speed text box
		this.txtSpeedMultiplier = new Button(x, y + h * 4 + h / 3, w / 2, h,
																function(){}, "speed" + "\n" + "multiplier", txtSize, typeface,
																colTransparent, colTransparent, colButtonText);
		this.buttons_time.push(this.txtSpeedMultiplier);
		
		// speed multiplier value text box
		this.txtSpeedMultiplierValue = new Button(x + w/2, y + h * 4 + h / 3, w / 4, h,
																function(){}, "x", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.buttons_time.push(this.txtSpeedMultiplierValue);
		this.setSpeedMultiplierText();
			
		// increase speed multiplier
		const increaseSpeedMultiplierButtonPressFunction = function() {
			this.scene.sequence.increaseSpeedMultiplier();
			this.scene.setSpeedMultiplierText();
		}
		this.btnIncreaseSpeedMultiplier = new Button(x + 3 * w / 4, y + h * 4 + h / 3, w / 4, h / 2,
																increaseSpeedMultiplierButtonPressFunction, "▲", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnIncreaseSpeedMultiplier.scene = thisScene;
		this.buttons_time.push(this.btnIncreaseSpeedMultiplier);
		
		// decrease speed multiplier
		const decreaseSpeedMultiplierButtonPressFunction = function() {
			this.scene.sequence.decreaseSpeedMultiplier();
			this.scene.setSpeedMultiplierText();
		}
		this.btnDecreaseSpeedMultiplier = new Button(x + 3 * w / 4, y + h * 4 + h / 2 + h / 3, w / 4, h / 2,
																decreaseSpeedMultiplierButtonPressFunction, "▼", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnDecreaseSpeedMultiplier.scene = thisScene;
		this.buttons_time.push(this.btnDecreaseSpeedMultiplier);
	}
	
	setSpeedMultiplierText() {
		this.txtSpeedMultiplierValue.text = "x";
		if (this.sequence) {
			let p = this.sequence.speedMultiplierParam;
			if (p > 0) this.txtSpeedMultiplierValue.text = str(p);
			else this.txtSpeedMultiplierValue.text = "1/" + str(-p);
		}
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