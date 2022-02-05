class RectToggleButton {
	constructor(x, y, w, h, text) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.text = text;

		this.state = true;
	}

	setSize(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	tryClick() {
		// check if mouse is over the button
		if (this.x < mouseX &&
			mouseX < this.x + this.w &&
			this.y < mouseY &&
			mouseY < this.y + this.h) {

			this.click();
		}
	}

	click() {
		this.state = !this.state;
	}

	draw() {
		// draw button
		strokeWeight(5);
		stroke(colDegreeButtonBorder);
		if (this.state) fill(colDegreeButtonFillOn);
		else fill(colDegreeButtonFillOff);

		rect(this.x, this.y, this.w, this.h);

		//draw text
		noStroke();
		fill(colDegreeButtonBorder);

		text(this.text, this.x + (this.w - textWidth(this.text)) / 2, this.y  + this.h / 2 + 0.25 * textSize());
	}
}
