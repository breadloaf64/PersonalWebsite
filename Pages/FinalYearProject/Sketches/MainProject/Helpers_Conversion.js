function convertImageToSequence1(source) {
	source.filter(BLUR, 3);
	source.loadPixels();
	let px = source.pixels;

	let voice = new Voice();

	for (let col = 0; col < floor(source.width); col++) {
		let colVals = getColVals(px, floor(source.width), floor(source.height), col);
		colVals = normaliseArr(colVals);
		colVals = invertArrVals(colVals);
		// colVals now has an element for each pixel in the column. if the pixel is black the value is 1, else 0.

		let v = map(indexOfMean(colVals), floor(source.height), 0, 0, 1);
		let t = map(col, 0, floor(source.width), 0, 1);

		if (isNaN(v)) {
			voice.updateSequence(t, -1);
		}
		else {
			voice.updateSequence(t, v);
		}
	}

	let out = new Sequence();
	out.voices.push(voice);
	return out;
}

function convertImageToSequence2(source) {

	source.loadPixels();
	let px = source.pixels;

	// for each column in the image, it contains an array of centres of clusters in that column
	const colsCentres = getColsCentres(px, source);
	//printCentres(colsCentres, source);

	// For each col, it contains an array of voice indices that the corresponding element (with same indices) in colsCentres maps to
	const mapsCentresToVoices = getMapsCentresToVoices(colsCentres);

	// we get the largest index of a voice that a centre is mapped to. Add 1 to get the number (since voices are zero indexed).
	const voiceCount = getJagged2DArrMax(mapsCentresToVoices) + 1;
	return makeSequence(voiceCount, source, mapsCentresToVoices, colsCentres);
}

function makeSequence(voiceCount, source, mapsCentresToVoices, colsCentres) {
	let voices = [];

	for (let i = 0; i < voiceCount; i++) { // loop through the voices that need to be added to the sequence
		let currentVoice = new Voice();

		for (let col = 0; col < floor(source.width) - 1; col++) { // scroll through the columns
			let currMapCentresToVoices = mapsCentresToVoices[col];
			let currColCentres = colsCentres[col];

			let nextMapCentresToVoices = mapsCentresToVoices[col + 1];
			let nextColCentres = colsCentres[col + 1];

			if (currMapCentresToVoices.includes(i) && nextMapCentresToVoices.includes(i)) { // if one of the col centres is mapped to the current voice
				let h1 = currColCentres[currMapCentresToVoices.findIndex((element) => element == i)]; // height on image of current col for this voice

				let t1 = map(col, 0, floor(source.width), 0, 1);
				let v1 = map(h1, floor(source.height), 0, 0, 1);

				let h2 = nextColCentres[nextMapCentresToVoices.findIndex((element) => element == i)]; // height on image of next col for this voice

				let t2 = map(col + 1, 0, floor(source.width), 0, 1);
				let v2 = map(h2, floor(source.height), 0, 0, 1);

				currentVoice.updateSequenceLerp(t1, v1, t2, v2);
			}
		}

		voices.push(currentVoice);
	}

	sequences[currentSequenceIndex].voices = voices;

	// passes sequence information down into child voices
	sequences[currentSequenceIndex].refreshQuantisation(); // update voice quantisation variables to reflect quantisationMode
	sequences[currentSequenceIndex].refreshNumBeats();
	sequences[currentSequenceIndex].refreshType();
	sequences[currentSequenceIndex].refreshScale();
	sequences[currentSequenceIndex].refreshSpeedMultiplier();
	sequences[currentSequenceIndex].setMaxSimultaneousVoices(getMaxSimultaneousVoices(colsCentres));
	sequences[currentSequenceIndex].setVols();

	return sequences[currentSequenceIndex];
}

function getMaxSimultaneousVoices(colsCentres) {
	// outputs the largest number of voices that are ever played at the same time, i.e. max(len(colCentres) | for colCentres in colsCentres)
	let max = 0;
	for (let colCentres of colsCentres) {
		let len = colCentres.length;
		if (len > max) {
			max = len;
		}
	}
	return max;
}

function getJagged2DArrMax(arr) {
	// returns the largest value in a jagged 2d array
	let max = Number.MIN_VALUE;
	for (let subArr of arr) {
		for (let element of subArr) {
			if (element > max) {
				max = element;
			}
		}
	}
	return max;
}

function getMapsCentresToVoices(colsCentres) {
	// For each col, it contains an array of voice indices that the corresponding element (with same indices) in colsCentres maps to
	let mapsCentresToVoices = [];
	let voiceCount = 0;
	let firstColCentres = colsCentres[0];

	// initial map. This needs to be separate because all other maps depend on the previous map.
	let currMap = [];
	for (let i = 0; i < firstColCentres.length; i++) {
		currMap.push(i);
		voiceCount++;
	}
	mapsCentresToVoices.push(currMap);

	// get all successive maps
	for (let i = 1; i < colsCentres.length; i++) {
		let prevColCentres = colsCentres[i - 1];
		let currColCentres = colsCentres[i];

		let currMap = [];

		let indicesMatched = [];

		if (prevColCentres.length < currColCentres.length) { // loop over centres of current previous column and look ahead

			// fill currMap with -1s. This way we can track which centres in the current column haven't been mapped to a voice
			for (let j = 0; j < currColCentres.length; j++) {
				currMap.push(-1);
			}

			// map each centre in previous column to nearest centre in current column
			for (let j = 0; j < prevColCentres.length; j++) {
				let currPrevCentre = prevColCentres[j]; // the current centre of the previous column we're looking at
				let nearestCurrCentre = getNearestArrValue(currPrevCentre, currColCentres, indicesMatched); // the nearest centre in the current column

				let indexOfNearest = currColCentres.findIndex((element) => element == nearestCurrCentre);
				let voice = mapsCentresToVoices[i - 1][j];
				currMap[indexOfNearest] = voice;
			}

			// centres that haven't been mapped are still mapped to -1. These need new voices created for them
			for (let j = 0; j < currMap.length; j++) {
				if (currMap[j] == -1) {
					let voice = 0;
					while(currMap.includes(voice)) {
						voice++;
					}
					currMap[j] = voice;
				}
			}
		}
		else {
			for (let j = 0; j < currColCentres.length; j++) { // loop over centres of current column and look back
				let currCentre = currColCentres[j];
				let nearestPrevCentre = getNearestArrValue(currCentre, prevColCentres, indicesMatched);

				let indexOfNearest = prevColCentres.findIndex((element) => element == nearestPrevCentre);
				let voice = mapsCentresToVoices[i - 1][indexOfNearest];
				currMap.push(voice);
				indicesMatched.push(indexOfNearest);

			}
		}

		mapsCentresToVoices.push(currMap);
	}

	//print(mapsCentresToVoices);
	return mapsCentresToVoices;
}

function getNearestArrValue(target, arr, ignoreIndices) {
	let nearestVal = NaN;
	for (let i = 0; i < arr.length; i++) {
		if (!ignoreIndices.includes(i)) {
			if (abs(arr[i] - target) < abs(nearestVal - target) || isNaN(nearestVal)) {
				nearestVal = arr[i];
			}
		}
	}
	return nearestVal;
}

function getColsCentres(px, source) {
	let colsCentres = []; // for each column in the image, it contains an array of centres of clusters in that column

	for (let col = 0; col < floor(source.width); col++) {
		let colVals = getColVals(px, floor(source.width), floor(source.height), col);
		colVals = normaliseArr(colVals);
		colVals = invertArrVals(colVals);
		// colVals now has an element for each pixel in the column. if the pixel is black the value is 1, else 0.

		let clusters = getClusters(colVals); // an array of arrays containing indices of adjacent black pixel clusters.
		let centres = getClusterCentres(clusters); // an array containing the mean index of each cluster
		colsCentres.push(centres);
	}
	return colsCentres;
}

function printCentres(colsCentres, source) {
	noFill();
	strokeWeight(3);
	stroke(255, 0, 0);

	for (let col = 0; col < floor(source.width); col++) {
		let centres = colsCentres[col];
		for (let centre of centres) {
			let x = map(col, 0, floor(source.width), 0, width);
			let y = map(centre, 0, floor(source.height), 0, height);
			point(x, y);
		}
	}
}

function getClusterCentres(clusters) {
	// an array containing the mean index of each cluster
	// clusters is an array of arrays containing indices of adjacent black pixel clusters.
	let centres = [];
	for (let cluster of clusters) {
		if (cluster.length > 0) {
			centres.push(arrMean(cluster));
		}
	}
	return centres;
}

function arrMean(arr) {
	let sum = arr.reduce((a, b) => a + b, 0); // sum of all values in the array
	return sum / arr.length;
}

function getClusters(arr) {
	// returns an array of arrays containing indices of adjacent values more than 0.5
	let threshold = (max(arr) + min(arr)) / 2
	let clusters = [];
	let inCluster = false;
	let currentCluster;
	for (let i = 0; i < arr.length; i++) {
		if (inCluster) {
			if (arr[i] > threshold) {
				// add to cluster
				currentCluster.push(i);
			}
			else {
				// end of cluster
				inCluster = false;
				clusters.push(currentCluster);
			}
		}
		else {
			if (arr[i] > threshold) {
				// found start of cluster
				inCluster = true;
				currentCluster = [];
			}
		}
	}
	return clusters;
}

function scaleArr(arr, scalar) {
	let out = [];
	for (let v of arr) {
		out.push(v * scalar);
	}
	return out;
}

function invertArrVals(arr) {
	// remaps the values
	let arrMax = max(arr);
	let out = [];

	for (let v of arr) {
		out.push(arrMax - v);
	}
	return out;
}

function normaliseArr(arr) {
	// rescale everything between 0 and 1
	return scaleArr(arr, 1 / max(arr));
}

function getColVals(px, w, h, col) {
	// returns an array which colds the pixel values (brightnesses) for the column specified
	let colVals = [];

	for (let row = 0; row < h; row++) {
		let pixelCol = getPixelByCoord(px, w, h, col, row);
		colVals.push(colourVal(pixelCol));
	}

	return colVals;
}

function colourVal(c) {
	// returns the greyscale brightness of a pixel, the mean of the r,g and b
	return round((red(c) + green(c) + blue(c)) / 3);
}

function getPixelByCoord(px, w, h, x, y) {
	let pixelIndex = (y * w + x) * 4;
	if (pixelIndex >= px.length) {
		print("invalid coordinates: " + x + ", " + y);
		return color(255, 255, 255, 255);
	}

	let r = px[pixelIndex];
	let g = px[pixelIndex + 1];
	let b = px[pixelIndex + 2];
	let a = px[pixelIndex + 3];

	return color(r, g, b, a);
}

function indexOfMean(arr) {
	let meanindex = 0;
	let sum = arr.reduce((a, b) => a + b, 0); // sum of all values in the array
	let weightedSum = 0;
	for (let i = 0; i < arr.length; i++) {
		weightedSum += i * arr[i];
	}
	return weightedSum / sum;
}
