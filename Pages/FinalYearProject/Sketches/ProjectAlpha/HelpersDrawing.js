function inverseRect(x, y, w, h) {
	x = round(x);
	y = round(y);
	w = round(w);
	h = round(h);
	
	rect(0, 0, x, height); // left bar
	rect(x, 0, w, y); // top middle
	rect(x + w, 0, width - (x + w), height); // right bar
	rect(x, y + h, w, height - (y + h)); // bottom middle
}

function drawImage(img, x, y, wi, he, mirrored) {
	if (mirrored) {
		push();
		translate(x + wi, y);
		scale(-1, 1);

		image(img, 0, 0, wi, he);

		pop();
	} else {
		image(img, x, y, wi, he);
	}
}