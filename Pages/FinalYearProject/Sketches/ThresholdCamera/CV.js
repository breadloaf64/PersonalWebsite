function thresholdFilter(inputImage) {
	let w = inputImage.width;
	let h = inputImage.height;

	capture.loadPixels(); // gets pixels of current frame
	if (cv && capture.pixels.length > 0) {
		let captureMat = new cv.Mat(h, w, cv.CV_8UC4);
		captureMat.data.set(capture.pixels); // load capture data into captureMat

		// define blur radius value
		var blurRadius = 50; // as a percentage
		blurRadius = map(blurRadius, 0, 100, 1, 10);

		// define theshold value
		var threshold = thresholdVal; // as a percentage
		threshold = map(threshold, 0, 100, 0, 255);

		// create greyscale image
		let gray = new cv.Mat(h, w, cv.CV_8UC1);
		cv.cvtColor(captureMat, gray, cv.COLOR_RGBA2GRAY, 0);

		// blur image
		var ksize = new cv.Size(blurRadius, blurRadius);
		var anchor = new cv.Point(-1, -1);
		let blurred = new cv.Mat(h, w, cv.CV_8UC1);
		cv.blur(gray, blurred, ksize, anchor, cv.BORDER_DEFAULT);

		// theshold blurred image
		let thresholded = new cv.Mat(h, w, cv.CV_8UC1);
		cv.threshold(blurred, thresholded, threshold, 255, cv.THRESH_BINARY);

		// load pixels back into image
		var newImg = createImage(inputImage.width, inputImage.height);
		newImg.loadPixels();

		//load greyscale data into image
		var dst = newImg.pixels; // destination
		var src = thresholded.data; // source
		var n = src.length;
		var j = 0;
		for (var i = 0; i < n; i++) {
			dst[j++] = src[i];
			dst[j++] = src[i];
			dst[j++] = src[i];
			dst[j++] = 255; // alpha
		}
		
		newImg.updatePixels();
		
		captureMat.delete();
		gray.delete();
		blurred.delete();
		thresholded.delete();

		return newImg;
	}
	return inputImage;
}

function blurFilter(inputImage) {
	let w = inputImage.width;
	let h = inputImage.height;

	capture.loadPixels(); // gets pixels of current frame
	if (cv && capture.pixels.length > 0) {
		let captureMat = new cv.Mat(h, w, cv.CV_8UC4);
		captureMat.data.set(capture.pixels); // load capture data into captureMat

		// define blur radius value
		var blurRadius = 100; // as a percentage
		blurRadius = map(blurRadius, 0, 100, 1, 10);

		// blur image
		var ksize = new cv.Size(blurRadius, blurRadius);
		var anchor = new cv.Point(-1, -1);
		let blurred = new cv.Mat(h, w, cv.CV_8UC4);
		cv.blur(captureMat, blurred, ksize, anchor, cv.BORDER_DEFAULT);

		// load pixels back into image
		var newImg = createImage(w, h);
		newImg.loadPixels();

		var n = w * h * 4;
		for (var i = 0; i < n; i++) {
			newImg.pixels[i] = blurred.data[i];
		}

		newImg.updatePixels();

		return newImg;
	}
	return inputImage;
}

function clusterFilter(inputImage) {
	let w = inputImage.width;
	let h = inputImage.height;

	capture.loadPixels(); // gets pixels of current frame
	if (cv && capture.pixels.length > 0) {
		let captureMat = new cv.Mat(h, w, cv.CV_8UC4);
		captureMat.data.set(capture.pixels); // load capture data into captureMat

		// define blur radius value
		var blurRadius = 100; // as a percentage
		blurRadius = map(blurRadius, 0, 100, 1, 10);

		// blur image
		var ksize = new cv.Size(blurRadius, blurRadius);
		var anchor = new cv.Point(-1, -1);
		let blurred = new cv.Mat(h, w, cv.CV_8UC4);
		cv.blur(captureMat, blurred, ksize, anchor, cv.BORDER_DEFAULT);

		var clusterCount = 2;
		var labels = new cv.Mat(); // will store the nearest cluster centre for each sample
		var attempts = 1;
		var centers = new cv.Mat();
		var crite = new cv.TermCriteria(cv.TermCriteria_EPS + cv.TermCriteria_MAX_ITER, 10000, 0.0001);
		//var criteria = [1,10,0.0001];

		cv.kmeans(blurred, clusterCount, labels, crite, attempts, cv.KMEANS_RANDOM_CENTERS, centers);

		// load pixels back into image
		var newImg = createImage(w, h);
		newImg.loadPixels();

		var n = w * h;
		let j = 0;
		for (var i = 0; i < n; i++) {
			newImg.pixels[j++] = blurred.data[i];
		}

		newImg.updatePixels();

		return newImg;
	}
	return inputImage;
}

function posterize(inputImage) {
	let w = inputImage.width;
	let h = inputImage.height;

	let mat = new cv.Mat(h, w, cv.CV_8UC4);
	mat.data.set(inputImage.pixels); // load capture data into captureMat

	let sample = new cv.Mat(mat.rows * mat.cols, 3, cv.CV_32F);
	for (let y = 0; y < mat.rows; y++) {
		for (let x = 0; x < mat.cols; x++) {
			for (let z = 0; z < 3; z++) {
				sample.floatPtr(y + x * mat.rows)[z] = mat.ucharPtr(y, x)[z];
			}
		}
	}

	var clusterCount = 2;
	var labels = new cv.Mat();
	var attempts = 5;
	var centers = new cv.Mat();

	var crite = new cv.TermCriteria(cv.TermCriteria_EPS + cv.TermCriteria_MAX_ITER, 10000, 0.0001);
	var criteria = [1, 10, 0.0001];

	cv.kmeans(sample, clusterCount, labels, crite, attempts, cv.KMEANS_RANDOM_CENTERS, centers);

	var newImage = new cv.Mat(mat.size(), mat.type());
	for (var y = 0; y < mat.rows; y++) {
		for (var x = 0; x < mat.cols; x++) {
			var cluster_idx = labels.intAt(y + x * mat.rows, 0);
			var redChan = new Uint8Array(1);
			var greenChan = new Uint8Array(1);
			var blueChan = new Uint8Array(1);
			var alphaChan = new Uint8Array(1);
			redChan[0] = centers.floatAt(cluster_idx, 0);
			greenChan[0] = centers.floatAt(cluster_idx, 1);
			blueChan[0] = centers.floatAt(cluster_idx, 2);
			alphaChan[0] = 255;
			newImage.ucharPtr(y, x)[0] = redChan;
			newImage.ucharPtr(y, x)[1] = greenChan;
			newImage.ucharPtr(y, x)[2] = blueChan;
			newImage.ucharPtr(y, x)[3] = alphaChan;
		}
	}
	mat.delete();

	var newImg = createImage(w, h);
	newImg.loadPixels();

	var n = w * h * 4;
	for (let i = 0; i < n; i++) {
		newImg.pixels[i] = newImage.data[i];
	}

	newImg.updatePixels();
	
	let average = 0;
	for (let i = 0; i < w * h; i++) {
		average += labels.intAt(i, 0);
	}
	average = average / (w * h);
	print(average);
	

	return newImg;

}