var photo;
var thresholdVal;

var FlipCamera;
var buttonPressedThisFrame = false;

var currentScene;
var currentSequenceIndex = -1;

var beatPeriod = 200; //ms
var masterTime = 0;
var timeAtStart = 0;

// canvas and capture size
var w = 400;
var h = 400;

function preload() {
	// emoji images sourced from https://openmoji.org/library/

	// title page
	img_emoji_musicnote = loadImage("img_emoji_musicnote.png");
	img_emoji_pencil = loadImage("img_emoji_pencil.png");

	// sequence icons
	img_emoji_drum = loadImage("img_emoji_drum.png");
	img_icon_sawtooth = loadImage("img_icon_sawtooth.png");
	img_icon_square = loadImage("img_icon_square.png");
	img_icon_sine = loadImage("img_icon_sine.png");
	img_icon_triangle = loadImage("img_icon_triangle.png");
	
	instrumentIcons = [img_icon_sine, img_icon_triangle, img_icon_square, img_emoji_drum];
}

function setup() {
	layout = new Layout();
	myStandardSetup();
	setupSound();
	setupSequences();
	setupScenes();
}

function setupScenes() {
	currentSequenceIndex = 0;
	
	scene_title = new Scene_title();
	scene_main = new Scene_main();
	scene_takePhoto = new Scene_takePhoto();
	scene_setThreshold = new Scene_setThreshold();
	scene_sequence = new Scene_sequence();
	
	scene_sequence.setSequence(currentSequenceIndex);
	changeScene(scene_title);
}

function setupSequences() {
	sequence0 = new Sequence();
	sequence1 = new Sequence();
	sequence2 = new Sequence();
	sequence3 = new Sequence();
	
	sequences = [sequence0, sequence1, sequence2, sequence3];
	for (let i = 0; i < 4; i++) {
		sequences[i].setType(i);
		sequences[i].numBeats = 16 + i * 4;
	}
}

function changeScene(newScene) {
	newScene.windowResized();
	currentScene = newScene;
}

function draw() {
	handleTime();
	handleSound();
	currentScene.mainLoop();
	render();
	buttonPressedThisFrame = false;
	clickedThisFrame = false;
}

function handleTime() {
	masterTime = millis() - timeAtStart;
}

function render() {
	background(colBackground);
	currentScene.render();
}