const minNote = -48; // A0, the lowest note on a piano
const maxNote = 39; // C8, the highest note on a piano
var minFrequency;
var maxFrequency;

function setupSound() {
	minFrequency = noteToFrequency(minNote);
	maxFrequency = noteToFrequency(maxNote);
	
	initialiseScales();
}

function handleSound() {
	for (let voice of voices) {
		voice.play(playHead.position);
	}
}

function stopSound() {
	for (let voice of voices) {
		voice.stop();
	}
}

function propToFrequency_exp(prop, constrainFreq) {
	// takes a value from 0 to 1 and maps it on an exponential scale to a frequency
	
	let f =  minFrequency * exp((prop) * log(maxFrequency / minFrequency));
	if (constrainFreq) f = constrain(f, minFrequency, maxFrequency);
	return f;
}

function frequencyToProp_exp(freq) {
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

var quantiseMode = 0; // 0 for no quantisation, 1 for pitch, 2 for time, 3 for both

function changeQuantisation() {
	// iterate through the types
	quantiseMode++;
	quantiseMode = quantiseMode % 4;
	
	let quantisePitch = (quantiseMode % 2 == 1);
	let quantiseTime = (quantiseMode >= 2);
	
	for (let voice of voices) {
		voice.quantisePitch = quantisePitch;
		voice.quantiseTime = quantiseTime;
	}
}