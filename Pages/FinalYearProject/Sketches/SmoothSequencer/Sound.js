var frequency = 0;
var volume = 0;

var sine; // sound file of the sine wave
var baseFrequency;

var minSpeedMultiplier = 0.01;
var maxSpeedMultiplier = 2;
var minFrequency;
var maxFrequency;

function preloadSound() {
  // Load a sound file
  sine = loadSound("1kHz_44100Hz_16bit_05sec.wav");
  baseFrequency = 1000; //Hz
}

function setupSound() {
  sine.loop();
  minFrequency = baseFrequency * minSpeedMultiplier;
  maxFrequency = baseFrequency * maxSpeedMultiplier;
}

function handleSound() {
  setVolume();
  setFrequency();
}

function setVolume() {
  if (isMobile) {
    volume = map(gyroBeta, -180, 180, 0, 1, true);
  } else {
    // Set the volume according to mouse height
    volume = map(currentMouseY, 0, height, 1, 0, true);
  }
  sine.amp(volume);
}

function setFrequency() {
  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch

  let speedMultiplier = map(
    sequence[round(playHeadPos)],
    height,
    0,
    minSpeedMultiplier,
    maxSpeedMultiplier,
    true,
  );

  if (
    minSpeedMultiplier < speedMultiplier &&
    speedMultiplier < maxSpeedMultiplier
  ) {
    // if statement needed for weird case when multiplier is non-finite
    sine.rate(speedMultiplier);
  }

  // figure out actual frequency
  frequency = baseFrequency * speedMultiplier;
}
