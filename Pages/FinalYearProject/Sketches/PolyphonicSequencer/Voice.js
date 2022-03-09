// this class hold all the information for one voice. One voice can only play one note at a time.
// the class is also responsible for outputting the voice, both visually and audibly. It also deals with quantisation.
class Voice {
	constructor() {
		this.osc = new p5.Oscillator('sine');
		this.playing = false;
		
		this.numTimeSteps = width / 2; // number of individual pitches in the voice's sequence
		this.sequence = this.freshSequence(); // sequence will hold a value between 0 and 1 for each time step.
		
		this.quantisePitch = (quantiseMode % 2 == 1);
		this.scale = quantiseScale;
		
		this.quantiseTime = (quantiseMode >= 2);
		this.numQuantisedBeats = numQuantisedBeats;
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
	
	getNearestTimeStep(t) {
		let nearestTimeStep = floor(t * this.numTimeSteps); // index of nearest timestep to t
		nearestTimeStep = constrain(nearestTimeStep, 0, this.numTimeSteps - 1); // make sure nearestTimeStep is indexable in the sequence
		return nearestTimeStep;
	}
	
	getQuantisedTimeStep(t) {
		let quantisedBeat = floor(t * this.numQuantisedBeats); // which beat we are on.
		let quantisedT = quantisedBeat / this.numQuantisedBeats; // the value of t that corresponds to this beat
		let quantisedTimeStep = this.getNearestTimeStep(quantisedT);
		return quantisedTimeStep;
	}
	
	draw() {
		strokeWeight(2);
		stroke(colVoice);
		
		for (let i = 0; i < this.numTimeSteps - 1; i++) { // loop through the time steps of the sequence
			
			let t1 = i / this.numTimeSteps;
			let t2 = (i + 1) / this.numTimeSteps;

			let v1 = this.getVfromT(t1);
			let v2 = this.getVfromT(t2);
			
			if (v1 >= 0 && v2 >= 0) {
				// draw a line between this pitch and the next if both are active (>=0)
				let x1 = map(i, 0, this.numTimeSteps, 0, width);
				let x2 = map(i+1, 0, this.numTimeSteps, 0, width);
				
				let y1 = map(v1, 0, 1, height, 0);
				let y2 = map(v2, 0, 1, height, 0);
				
				if (this.quantisePitch) {
					y1 = map(frequencyToProp_exp(this.scale.snapFrequency(propToFrequency_exp(v1, true))), 0, 1, height, 0);
					y2 = map(frequencyToProp_exp(this.scale.snapFrequency(propToFrequency_exp(v2, true))), 0, 1, height, 0);
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
			// start / contrinue note
			let freq = this.getFrequencyFromV(v);
			this.osc.freq(freq, 0.1);
			
			if (!this.playing) {
				// start note
				this.osc.start();
				this.osc.amp(0.5, 0.2);
				this.playing = true;
			}
		}
		else {
			// end note
			if (this.playing) {
				this.osc.amp(0, 0.5); // gradual decay
				this.playing = false;
			}
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
}