function leaf(x, y, size, angle) {
	noStroke();
	fill(colStem);
	
	push();
	translate(x, y);
	rotate(angle);
	beginShape();
	
	let s = size / 60;
	let w =1; //width
	
	vertex(0 *s, 0 *s*w);
	vertex(3 *s, 3 *s*w);
	vertex(10*s, 5 *s*w);
	vertex(15*s, 3 *s*w);
	vertex(20*s, 0 *s*w);
	vertex(15*s, -3*s*w);
	vertex(10*s, -5*s*w);
	vertex(3 *s, -3*s*w);
	
	
	endShape(CLOSE);
	pop();
}

function petal (x, y, direction, length, width) {
	push();
	
	translate(x, y);
	rotate(direction);


	ellipse(length / 2, 0, length, width);
	pop();
}

function cloud(x, y, size, shift) {
	noStroke();
	fill(colCloud);
	
	circle(x, y, size * 2);
	circle(x + size * 0.9, y + size * 0.8, size);
	circle(x - size * 0.9, y + size * 0.7, size * 1.6);
	circle(x, y + size, size * 1.5);
	circle(x - size * 1.8, y + size * 0.8, size);
}