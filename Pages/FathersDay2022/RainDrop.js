class RainDrop {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.fallSpeed = 8;
	}
	
	draw () {
		stroke(colRain);
		strokeWeight(2);
		line(this.x, this.y, this.x, this.y + width * 0.01);
	}
	
	update() {
		this.y += this.fallSpeed;
	}
}