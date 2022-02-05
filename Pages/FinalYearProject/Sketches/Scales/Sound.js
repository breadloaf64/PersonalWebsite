var wave;

var baseFrequency;

var minFrequency = 20;
var maxFrequency = 20000;
var minNote;
var maxNote;

var frequency = 0;
var volume = 1;

var userScale;

function preloadSound() {
	// Load a sound file
  wave = loadSound('1kHz_44100Hz_16bit_05sec.wav');
	baseFrequency = 1000; //Hz
}

function setupSound() {
	minNote = round(frequencyToNote(minFrequency));
	maxNote = round(frequencyToNote(maxFrequency));

	initialiseScales();
	userScale = new Scale(3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
	btnArrScaleDegrees = new RectToggleButtonArray(50, height / 2 - 80, width - 100, 100, 1, 12, false, false);
	btnArrScaleDegrees.setText(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);
}

function handleSound() {
	setVolume();
	setFrequency();
}

function setVolume() {
	// Set the volume according to mouse height
  volume = map(mouseY, 0, height, 1, 0, true);
  wave.amp(volume);
}

function setFrequency() {
	let xProp = mouseX / width; // proportional distance up the screen

	// use exponential scale to match how frequency maps to pitch
	frequency = propToFrequency_exp(xProp, true);
	if (userScale.degrees.length > 0) {
		frequency = userScale.snapFrequency(frequency);
	}
  let speedMultiplier = frequency / baseFrequency;
  wave.rate(speedMultiplier);
}

// Conversions

function noteIndexToText(noteIndex) {
	// recall we treat A4 as the 0th note
	let noteNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

	let note = round(noteIndex);
	let cents = round((noteIndex - note) * 100);

	let noteName = noteNames[(note % 12 + 12) % 12];
	let oct = ((note + 9) - (((note + 9) % 12) + 12) % 12) / 12 + 4;

	let noteText = noteName + oct.toString();
	if (cents != 0) {
		noteText = noteText + " " + cents + " cents";
	}
	return noteText;
}

function propToFrequency_exp(prop, constrainFreq) {
	// takes a value from 0 to 1 and maps it on an exponential scale to a frequency

	let f =  minFrequency * exp((prop) * log(maxFrequency / minFrequency));
	if (constrainFreq) f = constrain(f, minFrequency, maxFrequency);
	return f;
}

function frequencyToProp(freq) {
	return log(freq / minFrequency) / log(maxFrequency / minFrequency);
}

function noteToFrequency(note) {
	// assuming A4 is the oth note with frequency 440Hz, in 12 TET
	return 440 * pow(2, note / 12);
}

function frequencyToNote(freq) {
	// assuming A4 is the 0th note with frequency 440Hz, in 12 TET
	return 12 * log(freq / 440) / log(2);
}
