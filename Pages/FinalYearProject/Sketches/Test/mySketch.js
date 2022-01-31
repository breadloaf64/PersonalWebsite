function setup() {
	createMetaTag();
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(map(mouseX, 0, width, 0, 255));
	fill(255);
	ellipse(width / 2, height / 2, 100, 100);
    fill(255, 0, 0);
    text("window.innerWidth: " + window.innerWidth, 100, 100);
    text("window.innerHeight: " + window.innerHeight, 100, 150);
}

function touchMoved() {
  // prevent the display from moving around when you touch it
  return false;
}

function createMetaTag() {
	let meta = createElement('meta');
	meta.attribute('name', 'viewport');
	meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

	let head = select('head');
	meta.parent(head);
}
