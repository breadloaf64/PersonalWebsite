var sine;

var baseFrequency;

var minSpeedMultiplier = 0.01;
var maxSpeedMultiplier = 10;
var minFrequency;
var maxFrequency;

var muted = true;
var frequency = 0;
var volume = 0;

function preloadSound() {
  // Load a sound file
  sine = loadSound("1kHz_44100Hz_16bit_05sec.wav");
  baseFrequency = 1000; //Hz
}

function setupSound() {
  minFrequency = baseFrequency * minSpeedMultiplier;
  maxFrequency = baseFrequency * maxSpeedMultiplier;
}

function handleSound() {
  setVolume();
  setFrequency();
}

function setVolume() {
  // Set the volume according to mouse height
  volume = map(currentMouseY, 0, height, 1, 0, true);
  sine.amp(volume);
}

function setFrequency() {
  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  let speedMultiplier = map(
    currentMouseX,
    0.0,
    width,
    minSpeedMultiplier,
    maxSpeedMultiplier,
    true,
  );
  sine.rate(speedMultiplier);

  // figure out actual frequency
  frequency = baseFrequency * speedMultiplier;
}
