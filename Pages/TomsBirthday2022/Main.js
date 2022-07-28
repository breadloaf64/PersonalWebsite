var u;

var imgs_cake;
var img_skeleton;
var img_spider;
var img_spiderweb;
var img_hero_idle_1;
var img_hero_idle_2;
var img_hero_dash;
var imgs_floorTexture;

var font_pixel;

var sfxs_destroy;
var sfx_gameOver;
var sfxs_bite;
var sfxs_dash;

var comboSound;
var soundtrack;

function preload() {
	imgs_cake = []
	imgs_cake.push(loadImage("cake_0.png"));
	imgs_cake.push(loadImage("cake_1.png"));
	imgs_cake.push(loadImage("cake_2.png"));
	imgs_cake.push(loadImage("cake_3.png"));
	imgs_cake.push(loadImage("cake_4.png"));
	img_skeleton = loadImage("skeleton.png");
	img_spider = loadImage("spider.png");
	img_spiderweb = loadImage("spiderweb.png");
	img_hero_idle_1 = loadImage("hero_idle_1.png");
	img_hero_idle_2 = loadImage("hero_idle_2.png");
	imgs_hero_idles = [img_hero_idle_1, img_hero_idle_2];
	img_hero_dash = loadImage("hero_dash.png");
	imgs_floorTexture = [];
	imgs_floorTexture.push(loadImage("floor_texture_0.png"));
	imgs_floorTexture.push(loadImage("floor_texture_1.png"));
	imgs_floorTexture.push(loadImage("floor_texture_2.png"));
	imgs_floorTexture.push(loadImage("floor_texture_3.png"));
	
	font_pixel = loadFont('slkscr.ttf');
	
	sfx_gameOver = loadSound("gameOver.wav")
	sfxs_destroy = [];
	sfxs_destroy.push(loadSound("destroy_0.wav"))
	sfxs_destroy.push(loadSound("destroy_1.wav"))
	sfxs_destroy.push(loadSound("destroy_2.wav"))
	sfxs_destroy.push(loadSound("destroy_3.wav"))
	sfxs_destroy.push(loadSound("destroy_4.wav"))
	sfxs_bite = [];
	sfxs_bite.push(loadSound("bite_0.wav"));
	sfxs_bite.push(loadSound("bite_1.wav"));
	sfxs_bite.push(loadSound("bite_2.wav"));
	sfxs_dash = [];
	sfxs_dash.push(loadSound("dash_0.wav"));
	sfxs_dash.push(loadSound("dash_1.wav"));
	sfxs_dash.push(loadSound("dash_2.wav"));
	
	soundtrack = loadSound("Soundtrack.mp3")
}

function setup() {
	imageMode(CENTER);
	myStandardSetup();
	u = width / 100;
	gameState = 0;
	
	comboOsc = new p5.Oscillator("triangle");
	comboEnv = new p5.Envelope(0.1, 0.2, 0.4, 0);
}

function playComboSound() {
  // starting the oscillator ensures that audio is enabled.
  comboOsc.start();
	comboOsc.freq(midiToFreq(combo + 50));
  comboEnv.play(comboOsc);
}

var score;

var target;
var hero;
var cake;
var enemies;
var spawner;
var destroyEffects;
var textPopups;
var combo;
var highestCombo = 0;

var gameOverTime = "";

var gameStartTime;

function initialiseGame() {
	score = 0;
	combo = 0;
	shakeOffset = createVector(0, 0);
	let spawnLocation = createVector(width / 2, height / 2);
	hero = new Hero(spawnLocation.copy().add(0, -u * 10));
	target = hero.pos.copy();
	cake = new Cake(createVector(width / 2, height / 2));
	enemies = [];
	spawner = new Spawner();
	destroyEffects = [];
	textPopups = [];
	gameStartTime = millis();
}

function draw() {
	interactedThisFrame = false;

	if (gameState == 1) {
		highestCombo = max(highestCombo, combo);
		handleShake();
		hero.move(target.copy());

		spawner.update();
		updateArr(enemies);
		updateArr(textPopups); 
		updateArr(destroyEffects);

		clearDestroyed();
		clearExpired(destroyEffects);
		clearExpired(textPopups);
	}
	
	render();
}

var shakeMag = 0;
var shakeOffset;

function handleShake() {
	let dampSpeed = 0.02;
	shakeMag -= deltaTime * dampSpeed;
	if (shakeMag < 0) shakeMag = 0;
	shakeOffset = createVector(random() * 2 - 1, random() * 2 - 1).mult(shakeMag);
}

function addShake(amount) {
	
	shakeMag += amount;
	shakeMag = min(shakeMag, 20);
}

function updateArr(arr) {
	for (let e of arr) {
		e.update();
	}
}

function clearExpired(arr) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i].expired) arr.splice(i, 1);
	}
}

function clearDestroyed() {
	for (let i = enemies.length - 1; i >= 0; i--) {
		if (enemies[i].destroyed) {
			enemies.splice(i, 1);
		}
	}
}

function mousePressed() {
	interaction();
}

function touchStarted() {
	interaction();
}

var interactedThisFrame = false;
function interaction() {
	if (!interactedThisFrame) {
		
		if (gameState == 0) {
			startGame();
		}
		else if (gameState == 1) {
			cleared = true;
			updateTarget();
		}
		else if (gameState == 2) {
			gameState = 0;
		}
		
	}
	interactedThisFrame = true;
}

function startGame() {
	initialiseGame();
	gameState = 1;
	soundtrack.amp(0.3);
	soundtrack.loop();
}

function updateTarget() {
	
	if (!hero.dashing) {
		target = createVector(mouseX, mouseY);
		// force distance from hero
		delta = target.copy().sub(hero.pos);
		if (delta.mag() > hero.dashDist) {
			target = delta.normalize().mult(hero.dashDist).add(hero.pos);
		}
		nextTarget = target.copy();
	}
	else {
		nextTarget = createVector(mouseX, mouseY);
		// force distance from hero
		delta = nextTarget.copy().sub(target);
		if (delta.mag() > hero.dashDist) {
			nextTarget = delta.normalize().mult(hero.dashDist).add(target);
		}
	}
	
}