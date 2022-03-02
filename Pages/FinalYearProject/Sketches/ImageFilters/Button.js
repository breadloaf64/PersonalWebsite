class Button {
	constructor(x, y, w, h, f, text, colFill, colBorder, colText) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.text = text;
		this.f = f; // function to call on click
		this.colFill = colFill;
		this.colBorder = colBorder;
		this.colText = colText;
		
		this.state = true;
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
		this.f();
	}
	
	draw() {
		// draw button
		strokeWeight(5);
		stroke(this.colBorder);
		fill(this.colFill);
		
		rect(this.x, this.y, this.w, this.h, 5);
		
		//draw text
		noStroke();
		fill(this.colText);
		
		text(this.text, this.x + (this.w - textWidth(this.text)) / 2, this.y  + this.h / 2 + 0.25 * textSize());
	}
}