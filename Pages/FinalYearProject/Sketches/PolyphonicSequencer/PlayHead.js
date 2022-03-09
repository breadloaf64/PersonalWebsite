class PlayHead {
	constructor() {
		this.playSpeed = 0.0003;
		this.position = 0; // 0 to 1
	}
	
	advance() {
		this.position += this.playSpeed * deltaTime;
		this.contrainPosition();
	}
	
	contrainPosition() {
		while(this.position < 0) {
			this.position++;
		}
		while(this.position >= 1) {
			this.position--;
		}
	}
	
	draw() {
		stroke(colPlayHead);
		strokeWeight(3);
		
		let x = map(this.position, 0, 1, 0, width);
		line(x, 0, x, height);
	}
}