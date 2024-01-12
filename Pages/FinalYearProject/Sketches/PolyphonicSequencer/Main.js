var paused = true;
var playHead;

var numQuantisedBeats;
var quantiseScale;

function setup() {
  myStandardSetup();
  setupSound();

  numQuantisedBeats = 16;
  quantiseScale = scale_Cpenta;

  initialiseVoices();
  playHead = new PlayHead();
  makeButtons();
}

function myStandardSetup() {
  setCanvas();
  createMetaTag();
  setColours();
  setNoiseTexture();
}

function draw() {
  handleMouseDrag();
  render();
  updatePrevMouse();

  if (!paused) {
    playHead.advance();
    handleSound();
  }
}

function pauseUnpause() {
  paused = !paused;
  if (!paused) {
  } else {
    stopSound();
  }
}
