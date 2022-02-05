class RectToggleButtonArray {
	// a rectangular grid of RectToggleButtons of identical shape
	
	constructor(x, y, w, h, numRows, numCols, singular, forceOne) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.numRows = numRows;
		this.numCols = numCols;
		this.singular = singular; // if true, then only one button in the array may have true state at once
		this.forceOne = forceOne; // if true, then we force there to always be at least 1 button with true state
		
		this.initialise();
	}
	
	initialise() {
		
		let buttonWidth = this.w / this.numCols;
		let buttonHeight = this.h / this.numRows;
	
		
		this.buttons = [];
		
		for (let r = 0; r < this.numRows; r++) {
			let row = [];
			for (let c = 0; c < this.numCols; c++) {
				let x = this.x + c * buttonWidth;
				let y = this.y + r * buttonHeight;
				
				row.push(new RectToggleButton(x, y, buttonWidth, buttonHeight, ""));
			}
			this.buttons.push(row);
		}
	}
	
	setText(texts) {
		let i = 0;
		for (let row of this.buttons) {
			for (let b of row) {
				if (i < texts.length) b.text = texts[i];
				i++;
			}
		}
	}
	
	tryClick() {
		let trueStateCount = 0;
		
		for (let row of this.buttons) {
			for (let b of row) {
				b.tryClick();
				
				if (b.state) trueStateCount++; // keep running total of buttons in true state
			}
		}
		if (this.forceOne && trueStateCount < 1) {
			this.buttons[0][0].state = true;
		}
	}
	
	draw() {
		for (let row of this.buttons) {
			for (let b of row) {
				b.draw();
			}
		}
	}
	
	anyTrueState() {
		// returns true if any of the buttons has true state
		let out = false;
		
		for (let row of this.buttons) {
			for (let b of row) {
				out = out | b.state;
			}
		}
		
		return out;
	}
}