class Snake {
	constructor() {
		this.head = createVector((int)(gameSize / 2), (int)(gameSize / 2));
		this.body = [this.head.copy()];
	}
	
	move(direction) {
		// move head
		if(direction == "u") {
			this.head.add(UP);
		}
		else if(direction == "r") {
			this.head.add(RIGHT);
		}
		else if(direction == "d") {
			this.head.add(DOWN);
		}
		else if(direction == "l") {
			this.head.add(LEFT);
		}
		
		this.body.push(this.head.copy());
		
		// shunt body
		if (!this.onApple()) {
			this.body.shift();
		}
		else {
			// eat apple
			setApple();
		}
		
		// check if game end (run into itself, go offscreen etc)
		if (this.invalidMove()) {
			gameState = 2;
			//print("gameover");
		}
	}
	
	invalidMove() {
		return this.runIntoBody() || this.headOutOfBounds();
	}
	
	runIntoBody() {
		let out = false;
		for (let i = 0; i < this.body.length - 1; i++) {
			if (equalVectors(this.body[i], this.head)) {
				out = true;
			}
		}
		return out;
	}
	
	headOutOfBounds() {
		return this.head.x < 0 || gameSize <= this.head.x
		|| this.head.y < 0 || gameSize <= this.head.y;
	}
	
	onApple() {
		// returns true if the head is at the same position as the apple
		return equalVectors(apple, this.head);
	}
	
	contains(v) {
		//returns ture if the vector v is part of the snake
		let out = false;
		for (var b of this.body) {
			if (equalVectors(b, v)) {
				out = true;
			}
		}
		return out;
	}
	
	printSnake() {
		print("Snake: [");
		for (var b of this.body) {
			print(b.x + " " + b.y);
		}
		print("]");
	}
	
	draw() {
		// draw body
		for (var b of this.body) {
			colourGamePixel(b.x, b.y, colSnake);
		}
		// draw head
		colourGamePixel(this.head.x, this.head.y, colHead);
	}
}