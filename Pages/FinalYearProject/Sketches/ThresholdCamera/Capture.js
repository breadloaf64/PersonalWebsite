var capture; // capture <video> dom element
let facingUser = false;

function setupCapture() {
	// initialise capture
	capture = createCapture({
		audio: false,
		video: {
			width: h,
			height: w,
			facingMode: facingUser ? 'user' : 'environment'
		}
	}, function() {
		//console.log('capture ready.')
	});
	capture.elt.setAttribute('playsinline', '');
	capture.size(w, h);
	capture.hide();
}

function removeCapture() {
	if (capture) {
		capture.parentElement.removeChild(e);
		capture.remove();
	}
}
