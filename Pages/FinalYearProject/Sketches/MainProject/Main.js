var photo;
var thresholdVal;

var FlipCamera;
var buttonPressedThisFrame = false;

var currentScene;
var currentSequenceIndex = -1;

var metronomeEnabled = true;

var tempo = 120; // beats per minute
var beatPeriod = 60000 / tempo; //ms per beat
var masterTime = 0;
var timeAtStart = 0;

// canvas and capture size
var w = 400;
var h = 400;

function preload() {
	img_test = loadImage("filteredsimple2.png");
	
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
	
	// Drum samples
	drum_kick = loadSound("909_kick.mp3");
	drum_snare = loadSound("909_snare.mp3");
	drum_clap = loadSound("909_clap.mp3");
	drum_hatClosed = loadSound("909_hatClosed.mp3");
	drum_crash = loadSound("909_crash.mp3");
	
	drumSamples = [drum_kick, drum_snare, drum_clap, drum_hatClosed, drum_crash];
	
	drum_click = loadSound("zargon_click.mp3");
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
	
	//let converted = convertImageToSequence2(img_test);
	//sequences[currentSequenceIndex] = converted;
	
	scene_sequence.setSequence(currentSequenceIndex);
	changeScene(scene_title);
}

function setupSequences() {
	sequence0 = new Sequence(); // sine
	sequence1 = new Sequence(); // triangle
	sequence2 = new Sequence(); // square
	sequence3 = new Sequence(); // drum
	
	sequences = [sequence0, sequence1, sequence2, sequence3];
	for (let i = 0; i < 4; i++) {
		sequences[i].setType(i);
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