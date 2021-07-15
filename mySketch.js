var fireworks;
var burstParticles;
var trailParticles;
var gravity;
var launcher;
var imgNoiseTexture;
var launchProb;

//colours
var colBursts;
var colBackground;
var colFrame;
var colTrail;

function preload() {
  fireworks = [];
	burstParticles = [];
	trailParticles = [];
	gravity = createVector(0, 0.05);
	launcher = new Launcher();
	launchProb = 1;
	
	//colours
	colBackground = color(10,15,24);
	colFrame = color(0);
	colTrail = color(255, 221, 0);
	colBursts = [];
	colBursts.push(color(222, 120, 208)); //magenta
	colBursts.push(color(154, 222, 230)); //cyan
	colBursts.push(color(186, 237, 057)); //green
	colBursts.push(color(227, 176, 109)); //orange
	colBursts.push(color(171, 148, 255)); //purple
	colBursts.push(color(255, 221, 000)); //yellow
	colBursts.push(color(237, 095, 085)); //red
}

function setup() {
	size = min(windowWidth, windowHeight) * 0.9;
	createCanvas(size, size);
	background(100);
	imgNoiseTexture = generateNoiseTexture();
}

function generateNoiseTexture() {
	let amount = 0.2;
	let img = createImage(int(width), int(height));
	img.loadPixels();
	for (let i = 0; i < img.width; i++) {
		for (let j = 0; j < img.height; j++) {
			if (random(1) < amount) {
				img.set(i, j, color(random(255), 15));
			} else {
				img.set(i, j, color(0, 0));
			}
		}
	}
	img.updatePixels();
	return img;
}

function mouseClicked() {
  fireworks.push(new Firework(mouseX, mouseY));
}

function draw() {
	launchProb = constrain(map(mouseY, 0, height, 1, 0), 0, 1);
	background(colBackground);
	launcher.update();
	updateFireworks();
	updateBurstParticles();
	updateTrailParticles();
	image(imgNoiseTexture, 0, 0);
	drawFrame();
}

function updateFireworks() {
	for (let fw of fireworks) {
		fw.update();
	}
	
	//Clear exploded fireworks
	for (let i = fireworks.length - 1; i >= 0; i--) {
		if(fireworks[i].exploded) {
			fireworks.splice(i, 1);
		}
	}
}

function updateBurstParticles() {
	for (let bp of burstParticles) {
		bp.update();
	}
	
	//Clear expended burst particles
	for (let i = burstParticles.length - 1; i >= 0; i--) {
		if(burstParticles[i].expended) {
			burstParticles.splice(i, 1);
		}
	}
}

function updateTrailParticles() {
	for (let tp of trailParticles) {
		tp.update();
	}
	
	//Clear expended burst particles
	for (let i = trailParticles.length - 1; i >= 0; i--) {
		if(trailParticles[i].expended) {
			trailParticles.splice(i, 1);
		}
	}
}

function drawFrame() {
	strokeWeight(30);
	stroke(colFrame);
	noFill();
	rect(0, 0, width, height);
}

//================================
//            CLASSES
//================================

class MinimalTrail {
	constructor() {
		this.nodeCount = 10;
		this.nodes = [];
	}
	
	draw(newPos, col) {
		this.nodes.push(newPos.copy());
		
		noFill();
		stroke(col);
		strokeWeight(4);
		beginShape();
		for (let node of this.nodes) {
			vertex(node.x, node.y);
		}
		endShape();
	}
}

class Launcher {
	constructor() {
		this.periodAverage = 20;
		this.periodVary = 10;
		this.positionAverage = 400;
		this.positionVary = 100;
		this.wait = 1;
	}
	
	update() {
		this.wait--;
		if (this.wait < 0) {
			this.launch();
			this.wait = this.periodAverage + vary(this.periodVary);
		}
	}
	
	launch() {
		if(random(1) < launchProb) {
			let position = this.positionAverage + vary(this.positionVary);
			fireworks.push(new Firework(position, height));
		}
	}
}


class Firework {
	constructor(x, y) {
		
		//Tweakables
		let burnPowerAverage = 0.45;
		let burnPowerVary = 0.1;
		let burnAngleAverage = PI / 2;
		let burnAngleVary = PI / 16;
		this.burnTime = 20;
		this.idleTime = 60;
		this.trailProbability = 0.4;
		
		let burstAmountAverage = 70;
		let burstAmountVary = 30;
		let burstPowerAverage = 17;
		let burstPowerVary = 5;
		
		//set values from tweakables
		let burnPower = -burnPowerAverage + vary(burnPowerVary);
		let burnAngle = burnAngleAverage + vary(burnAngleVary);
		this.burstAmount = burstAmountAverage + vary(burstAmountVary);
		this.burstPower = burstPowerAverage + vary(burstPowerVary);
		
		//physics
		this.position = createVector(x, y);
		this.velocity = createVector(0, 0);
		this.burnAcceleration = p5.Vector.fromAngle(burnAngle, burnPower);
		
		//status
		this.age = 0;
		this.exploded = false;
		
		//Burst Particles
		this.burstCol = random(colBursts);
		this.burstParticles = [];
	}
	
	update() {
		if (this.age < this.burnTime + this.idleTime) {
			this.rocketPhysics();
			//this.draw();
			this.trail();
			this.age++;
		}
		else {
			this.burst();
			this.exploded = true;
		}
	}
	
	rocketPhysics() {
		let acceleration = createVector(0, 0);
		acceleration.add(gravity);
		
		if (this.age < this.burnTime) {
			acceleration.add(this.burnAcceleration)
		}
		
		this.velocity.add(acceleration);
		this.position.add(this.velocity);
	}
	
	trail() {
		if (random(1) < this.trailProbability) {
			trailParticles.push(new TrailParticle(this.position));
		}
	}
	
	draw() {
		if (this.age < this.burnTime) {
			fill(255, 0, 0);
		}
		else {
			fill(255);
		}
		ellipse(this.position.x, this.position.y, 10, 10);
	}
	
	burst() {
		for(let i = 0; i < this.burstAmount; i++) {
			burstParticles.push(this.generateBurstParticle());
		}
	}
	
	generateBurstParticle() {
		let power = this.burstPower * sqrt(random(1));
		let bpVelocity = p5.Vector.fromAngle(random(0, 2 * PI), power);
		bpVelocity.add(this.velocity);
		let bp = new BurstParticle(this.position, bpVelocity, this.burstCol);
		return bp;
	}
}


//===============



class BurstParticle {
	constructor(position, velocity, col) {
		this.position = position.copy();
		this.velocity = velocity.copy();
		this.age = 0;
		this.maxAge = 100;
		this.expended = false;
		this.mt = new MinimalTrail();
		this.col = col;
	}
	
	update() {
		if(this.age > this.maxAge) {
			this.expended = true;
		}
		this.handlePhysics();
		this.draw();
		this.age++;
	}
	
	handlePhysics() {
		let acceleration = createVector(0, 0);
		acceleration.add(gravity);
		acceleration.mult(0.1);
		this.velocity.add(acceleration);
		
		//drag
		this.velocity.mult(0.93); 
		
		this.position.add(this.velocity);
	}
	
	draw() {
		let alpha = map(this.age, 0, this.maxAge, 255, 0);
		let col = color(this.col);
		col.setAlpha(alpha);
		this.mt.draw(this.position, col);
	}
}

//==========================================

class TrailParticle {
	constructor(position) {
		this.position = position.copy();
		
		let kick = 0.3;
		let angle = random(2 * PI);
		this.velocity = p5.Vector.fromAngle(angle, kick);
		
		this.age = 0;
		this.maxAge = 50;
		this.expended = false;
	}
	
	update() {
		if(this.age > this.maxAge) {
			this.expended = true;
		}
		this.handlePhysics();
		this.draw();
		this.age++;
	}
	
	handlePhysics() {
		let acceleration = createVector(0, 0);
		acceleration.add(gravity);
		acceleration.mult(0.4);
		this.velocity.add(acceleration);
		
		this.position.add(this.velocity);
	}
	
	draw() {
		let alpha = map(this.age, 0, this.maxAge, 255, 0);
		let col = colTrail;
		noStroke();
		col.setAlpha(alpha);
		fill(col);
		let diameter = random(4, 6)
		ellipse(this.position.x, this.position.y, diameter, diameter);
	}
}

function vary(amount) {
	return random(-amount, amount);
}