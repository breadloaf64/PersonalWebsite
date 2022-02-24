var capture; // capture <video> dom element

function setupCapture() {
	// initialise capture
	capture = createCapture({
		audio: false,
		video: {
			width: h,
			height: w
		}
	}, function() {
		//console.log('capture ready.')
	});
	capture.elt.setAttribute('playsinline', '');
	capture.size(w, h);
	capture.hide();
}