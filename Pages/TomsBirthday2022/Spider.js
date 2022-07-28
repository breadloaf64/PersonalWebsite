class Spider {
	constructor(pos) {
		// enemy general attributes
		this.pos = pos;
		this.atBorder = false;
		this.hitRadius = u * 6;
		this.destroyed = false;
		this.destroyScore = 10;

		this.lastWebTime = 0;
		this.webCooldown = 400; //ms

		this.moveSpeed = 0.06; // world units per millisecond
	}

	draw() {
		// noStroke();
		// fill(255, 255, 255);
		// rect(this.pos.x, this.pos.y, u * 3, u * 3);

		let scalar = 2 * u / 5.376;
		noSmooth();
		let flip = (floor(millis() / 200) % 2) * 2 - 1;
		push();
		translate(this.pos.x, this.pos.y);
		scale(flip, 1);

		image(img_spider, 0, 0, img_spider.width * scalar, img_spider.height * scalar);
		pop();
	}

	update() {
		if (!this.atBorder) { // move to border
			let toCake = cake.pos.copy().sub(this.pos);

			// move
			let moveDist = this.moveSpeed * deltaTime;
			let movement = toCake.copy().normalize().mult(moveDist);
			this.pos.add(movement);

			// test proximity to border
			let borderWidth = 17 * u;
			if (borderWidth < this.pos.x && this.pos.x < width - borderWidth && borderWidth < this.pos.y && this.pos.y < height - borderWidth) {
				this.atBorder = true;
			}
		}
		else { // fire webs
			if (millis() - this.lastWebTime > this.webCooldown) {
				this.lastWebTime = millis();
				// fire web
				enemies.push(new Web(this.pos));
			}
		}

		// test proximity to hero
		let dist = this.pos.copy().sub(hero.pos).mag();
		if (dist < this.hitRadius && hero.dashing) {
			this.destroyed = true;
			destroyEffects.push(new DestroyEffect(this.pos, 1));
			random(sfxs_destroy).play()

			let textPopupPos = this.pos.copy().add(createVector(random(5 * u) - 2.5 * u, random(5 * u) - 2.5 * u));
			textPopups.push(new TextPopup(textPopupPos, "+" + this.destroyScore * combo, u * 4, 700));
			score += this.destroyScore * combo;

			hero.enemiesHitDuringDash++;
			combo += hero.enemiesHitDuringDash;
			playComboSound();
		}
	}
}
