var embeddedOnWebsite = true;

function createMetaTag() {
	let meta = createElement('meta');
	meta.attribute('name', 'viewport');
	meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

	let head = select('head');
	meta.parent(head);
}

function windowResized() {
	let parent = canvas.parentElement;
	let w = parent.clientWidth;
	let h = parent.clientHeight;

	let size = min(w, h);
  resizeCanvas(size, size, true);
	makePauseButton();
    if (btnArrScaleDegrees) {  // we need this check, because on mobile window is resized before setup (this our object doesn't exist yet)
		setSizeScaleDegreesButtons();
	}
}
