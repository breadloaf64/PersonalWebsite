class Leaf {
	constructor(x, y, grownSize, angle) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.age = 0;
		this.maxAge = 100;
		this.size = 0;
		this.grownSize = grownSize;
		this.time = 0;
		this.waveAmount = 0.5;
		this.waveFreq = map(random(1), 0, 1, 0.8, 1.2);
	}
	
	draw() {
		leaf(this.x, this.y, this.size, this.angle + map(sin(this.time * 0.01 * this.waveFreq), -1, 1, -PI / 16 * this.waveAmount, PI / 16 * this.waveAmount));
	}
	
	update() {
		this.age++;
		if (this.age > this.maxAge) this.age = this.maxAge;
		this.size = map(this.age, 0, this.maxAge, 0, this.grownSize);
		this.time++;
	}
}