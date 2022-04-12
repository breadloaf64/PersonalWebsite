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
	if (!playing) return;
	
	if (currentScene.name === "sequence") {
		// Only handle sound of the current sequence
		playSequence(sequences[currentSequenceIndex]);
		
		for (let i = 0; i < 4; i++) { // silence all other sequences
			if (i != currentSequenceIndex) {
				sequences[i].silence();
			}
		}
	}
	else if (currentScene.name === "main") {
		// play all sequences
		for (let sequence of sequences) {
			playSequence(sequence);
		}
	}
	else {
		// no sound should play on any other scene
		for (let sequence of sequences) {
			sequence.silence();
		}
	}
}

function playSequence(sequence) {
	let t = ((masterTime / beatPeriod) % sequence.numBeats) / sequence.numBeats;
	//print("sequenceIndex: " + currentSequenceIndex + ", masterTime: " + masterTime + ", beatPeriod: " + beatPeriod + ", sequence.numBeats" + sequence.numBeats + ", t: " + t);
	sequence.play(t);
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