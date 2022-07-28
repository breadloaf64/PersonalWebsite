class DestroyEffect {
	constructor(pos, power) {
		this.pos = pos.copy();
		this.expired = false;
		this.age = 0;
		this.maxAge = random(300) + 400 * power * 0.5;
		this.radius = (random(1) + 2) * u * 20 * power;
		addShake((random(2) + 2) * power * 1.5);
	}
	
	draw() {
		noStroke();
		fill(255, map(this.age, 0, this.maxAge, 150, 0));
		ellipse(this.pos.x, this.pos.y, this.radius);
	}
	
	update() {
		this.age += deltaTime;
		if (this.age > this.maxAge) this.expired = true;
	}
}