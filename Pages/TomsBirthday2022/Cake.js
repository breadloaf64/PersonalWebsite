class Cake {
	constructor(pos) {
		this.pos = pos;
		this.hp = 100;
		this.eatRadius = u * 5;
	}

	draw() {
		// noStroke();
		// fill(0, 255, 255);
		// ellipse(this.pos.x, this.pos.y, u * 3);
		let scalar = 3 * u / 5.376;
		noSmooth();
		let frame = 0;
		if (this.hp == 100) frame = 0;
		else if (this.hp > 75) frame = 1;
		else if (this.hp > 50) frame = 2;
		else if (this.hp > 25) frame = 3;
		else if (this.hp > 0) frame = 4;
		else return; // draw nothing
		image(imgs_cake[frame], this.pos.x, this.pos.y, imgs_cake[0].width * scalar, imgs_cake[0].height * scalar);
	}

	damage(damage) {
		this.hp -= damage;
		random(sfxs_bite).play();
		if (this.hp <= 0) {
			sfx_gameOver.play();
			soundtrack.stop();
			gameState = 2;
			let time = (millis() - gameStartTime) / 1000;
			gameOverTime = floor(time) + nf(time - floor(time), 0, 2).substring(1);
		}
	}
}
