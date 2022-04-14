class Scene_main {
	constructor() {
		this.name = "main";
		
		this.makeSequenceBoxButtons();
		this.makeSequenceBoxes();
		this.makeButtons();
	}
	
	makeButtons() {
		this.buttons = [];
		
		const txtSize = layout.subSecondarySquare_w / 15;
		const typeface = "monospace";
		textFont(typeface, txtSize);
		
		const x = layout.subSecondarySquare_x;
		const y = layout.subSecondarySquare_y;
		const h = layout.subSecondarySquare_h / 4;
		const w = layout.subSecondarySquare_w;
		
		const medScalar = 0.9;
		const medW = w * medScalar;
		const medH = h * medScalar;
		const medTxtSize = txtSize * medScalar;
		
		const smallScalar = 0.7;
		const smallW = w * smallScalar;
		const smallH = h * smallScalar;
		const smallTxtSize = txtSize * smallScalar;
		
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
		this.btnStopStart = new Button(x, y + h * 0, w, h * 1.3,
															 stopStartButtonPressFunction, stopStartButtonText, txtSize * 2, typeface,
															colButtonFill, colButtonBorder, colButtonText);
		this.btnStopStart.scene = thisScene;
		this.buttons.push(this.btnStopStart);
		
		// tempo collection border
		this.borderTempo = new Button(x, y + h * 1.5, w / 2, h,
																function(){}, "", txtSize, typeface,
																colTransparent, colButtonBorder, colTransparent);;
		this.buttons.push(this.borderTempo);
		
		// tempo value text box
		this.txtTempoVal = new Button(x, y + h * 1.5, w / 4, h,
																function(){}, str(tempo) + "bpm", txtSize, typeface,
																 colTransparent, colTransparent, colButtonText);
		this.buttons.push(this.txtTempoVal);
		
		// increase tempo
		const increaseTempoFunction = function() {
			tempo += 10;
			beatPeriod = 60000 / tempo; // bpm to ms per beat
			this.scene.txtTempoVal.text = str(tempo) + "bpm";
		}
		this.btnIncreaseTempo = new Button(x + 1 * w / 4, y + h * 1.5, w / 4, h / 2,
																increaseTempoFunction, "▲", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnIncreaseTempo.scene = thisScene;
		this.buttons.push(this.btnIncreaseTempo);
		
		// decrease tempo
		const decreaseTempoFunction = function() {
			tempo -= 10;
			if (tempo <= 0) tempo = 10;
			beatPeriod = 60000 / tempo; // bpm to ms per beat
			this.scene.txtTempoVal.text = str(tempo) + "bpm";
		}
		this.btnDecreaseTempo = new Button(x + 1 * w / 4, y + h * 1.5 + h / 2, w / 4, h / 2,
																decreaseTempoFunction, "▼", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnDecreaseTempo.scene = thisScene;
		this.buttons.push(this.btnDecreaseTempo);
		
		//toggle metrognome
		let toggleMetronomeText = "metronome ☐";
		if (metronomeEnabled) toggleMetronomeText = "metronome ☑";
		// toggle metronome
		const toggleMetronomeFunction = function() {
			metronomeEnabled = !metronomeEnabled;
			let toggleMetronomeText = "metronome ☐";
			if (metronomeEnabled) toggleMetronomeText = "metronome ☑";
			this.scene.btnToggleMetronome.text = toggleMetronomeText;
		}
		this.btnToggleMetronome = new Button(x + w / 2, y + h * 1.5, w / 2, h,
																toggleMetronomeFunction, toggleMetronomeText, txtSize, typeface,
																 colTransparent, colButtonBorder, colButtonText);
		this.btnToggleMetronome.scene = thisScene;
		this.buttons.push(this.btnToggleMetronome);
		
		// clear all button
		const clearAllButtonPressFunction = function() {
			stopPlaying();
			this.scene.btnStopStart.text = "▶";
			setupSequences();
			for (let i = 0; i < 4; i++) {
				this.scene.sequenceBoxes[i].sequence = sequences[i];
			}
			tempo = 120;
			beatPeriod = 60000 / tempo;
		}
		this.btnClearAll = new Button(x + (w - smallW) / 2, y + h * 3.3 + (h - smallH) / 2, smallW, smallH,
																	clearAllButtonPressFunction, "clear all", txtSize, typeface,
																 colButtonFill, colButtonBorder, colButtonText);
		this.btnClearAll.scene = thisScene;
		this.buttons.push(this.btnClearAll);
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