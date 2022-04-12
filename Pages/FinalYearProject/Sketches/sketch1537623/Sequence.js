class Sequence {
	constructor() {
		this.initialiseVoices();
		this.quantisePitch = false;
		this.quantiseTime = false;
		this.numBeats = 16;
	}
	
	toggleQuantisePitch() {
		this.quantisePitch = !this.quantisePitch;
		this.refreshQuantisation();
	}
	
	toggleQuantiseTime() {
		this.quantiseTime = !this.quantiseTime;
		this.refreshQuantisation();
	}
	
	setNumBeats(numBeats) {
		this.numBeats = numBeats;
		for (let voice of this.voices) {
			voice.numBeats = numBeats;
		}
	}
	
	setType(type) {
		this.type = type;
		for (let voice of this.voices) {
			voice.setType(type);
		}
	}
	
	refreshType() {
		for (let voice of this.voices) {
			voice.setType(this.type);
		}
	}
	
	initialiseVoices() {
		this.voices = [];
	}
	
	setMaxSimultaneousVoices(val) {
		this.maxSimultaneousVoices = val;
	}
	
	setVols() {
		let v = 0.25 / this.maxSimultaneousVoices;
		for (let voice of this.voices) {
			voice.setVol(v);
		}
	}
	
	refreshNumBeats() {
		for (let voice of this.voices) {
			voice.numBeats = this.numBeats;
		}
	}
	
	draw(x, y, w, h) {
		for (let voice of this.voices) {
			voice.draw(x, y, w, h);
		}
	}
	
	play(t) {
		for (let voice of this.voices) {
			voice.play(t);
		}
	}
	
	refreshQuantisation() {
		for (let voice of this.voices) {
			voice.changeQuantisation(this.quantisePitch, this.quantiseTime);
		}
	}
	
	silence() {
		for (let voice of this.voices) {
			voice.stop();
		}
	}
}

// this class hold all the information for one voice. One voice can only play one note at a time.
// the class is also responsible for outputting the voice, both visually and audibly. It also deals with quantisation.
class Voice {
	constructor() {
		this.osc = new p5.Oscillator('sine');
		this.oscStarted = false;
		//this.osc.start();
		
		this.numTimeSteps = width / 2; // number of individual pitches in the voice's sequence
		this.sequence = this.freshSequence(); // sequence will hold a value between 0 and 1 for each time step.
		
		this.quantisePitch = false;
		this.scale = quantiseScale;
		
		this.quantiseTime = false;
		this.numBeats = 16;
		
		this.c = color(0);
	
		this.vol = 0.5;
	}
	
	setType(type) {
		this.type = type;
		if (type == 0) this.osc = new p5.Oscillator('sine');
		else if (type == 1) this.osc = new p5.Oscillator('triangle');
		else if (type == 2) this.osc = new p5.Oscillator('square');
		else this.osc = new p5.Oscillator('saw');
	}
	
	setVol(vol) {
		this.vol = vol;
	}
	
	freshSequence() {
		// returns a blank sequence initialised to -1 for each timestep
		let seq = [];
		for (let i = 0; i < this.numTimeSteps; i++) {
			seq.push(-1); // a value of -1 in the sequence means that no note is being played
		}
		return seq;
	}
	
	updateSequence(t, v) {
		// t is a value between 0 and 1 indicating how far through the sequence you are. We are changing the pitch at the timestep neares to t.
		// v is the new value between 0 and 1 for that timestep
		this.sequence[this.getNearestTimeStep(t)] = v;
		//print("t: " + t + ", nearest timestep: " + this.getNearestTimeStep(t) + ", v: " + v);
		if (this.getNearestTimeStep(t) == 0) {
			//print("zero to " + v)
		}
	}
	
	updateSequenceLerp(t1, v1, t2, v2) {
		if (t1 > t2) { // switch ts and vs to ensure t1 is an earlier time than t2;
			let temp = t1;
			t1 = t2;
			t2 = temp;
			
			temp = v1;
			v1 = v2;
			v2 = temp;
		}
		
		let earliestTimeStep = this.getNearestTimeStep(t1);
		let latestTimeStep = this.getNearestTimeStep(t2);
		
		for (let i = earliestTimeStep; i <= latestTimeStep; i++) {
			let v = map(i, earliestTimeStep, latestTimeStep, v1, v2);
			this.sequence[i] = v;
		}
	}
	
	getNearestTimeStep(t) {
		let nearestTimeStep = floor(t * this.numTimeSteps); // index of nearest timestep to t
		nearestTimeStep = constrain(nearestTimeStep, 0, this.numTimeSteps - 1); // make sure nearestTimeStep is indexable in the sequence
		return nearestTimeStep;
	}
	
	getQuantisedTimeStep(t) {
		let quantisedBeat = floor(t * this.numBeats); // which beat we are on.
		let quantisedT = quantisedBeat / this.numBeats; // the value of t that corresponds to this beat
		let quantisedTimeStep = this.getNearestTimeStep(quantisedT);
		return quantisedTimeStep;
	}
	
	draw(x, y, w, h) {
		strokeWeight(2);
		stroke(this.c);
		
		for (let i = 0; i < this.numTimeSteps - 1; i++) { // loop through the time steps of the sequence
			
			let t1 = i / this.numTimeSteps;
			let t2 = (i + 1) / this.numTimeSteps;

			let v1 = this.getVfromT(t1);
			let v2 = this.getVfromT(t2);
			
			if (v1 >= 0 && v2 >= 0) {
				// draw a line between this pitch and the next if both are active (>=0)
				let x1 = map(i, 0, this.numTimeSteps, x, x + w);
				let x2 = map(i+1, 0, this.numTimeSteps, x, x + w);
				
				let y1 = map(v1, 0, 1, y + h, y);
				let y2 = map(v2, 0, 1, y + h, y);
				
				if (this.quantisePitch) {
					y1 = map(frequencyToProp_exp(this.scale.snapFrequency(propToFrequency_exp(v1, true))), 0, 1, y + h, y);
					y2 = map(frequencyToProp_exp(this.scale.snapFrequency(propToFrequency_exp(v2, true))), 0, 1, y + h, y);
				}
				
				line(x1, y1, x2, y2);
			}
		}
	}
	
	play(t) {
		// t is a value between 0 and 1 indicating how far through the sequence you are. We are accessing the pitch at the timestep neares to t.
		let v = this.getVfromT(t);
		
		// handle start/ end of note. We check if a note should be being played
		if (v >= 0) {
			// start / continue note
			
			if (!this.oscStarted) {
				this.osc.start();
				this.oscStarted = true;
			}
			
			let freq = this.getFrequencyFromV(v);
			this.osc.freq(freq, 0.1);

			// start note
			this.osc.amp(this.vol);
		}
		else {
			// end note
			this.osc.amp(0); // gradual decay
		}
	}
	
	getVfromT(t) {
		let v = 0;
		if (this.quantiseTime) v = this.sequence[this.getQuantisedTimeStep(t)];
		else v = this.sequence[this.getNearestTimeStep(t)];
		return v;
	}
	
	getFrequencyFromV(v) {
		let freq = 0;
		if (this.quantisePitch) {
			freq = this.scale.snapFrequency(propToFrequency_exp(v, true));
		}
		else {
			freq = propToFrequency_exp(v, true);
		}
		return freq;
	}
	
	stop() {
		this.osc.amp(0, 0.5); // gradual decay
		this.playing = false;
	}
	
	changeQuantisation(pitch, time) {
		this.quantisePitch = pitch;
		this.quantiseTime = time;
	}
}