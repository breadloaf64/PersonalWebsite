function inverseRect(outX, outY, outW, outH, inX, inY, inW, inH) {
  inX = round(inX);
  inY = round(inY);
  inW = round(inW);
  inH = round(inH);

  outX = round(outX);
  outY = round(outY);
  outW = round(outW);
  outH = round(outH);

  rect(outX, outY, inX - outX, outH); // left bar
  rect(inX, outY, inW, inY - outY); // top middle
  rect(inX + inW, outY, outX + outW - (inX + inW), outH); // right bar
  rect(inX, inY + inH, inW, outY + outH - (inY + inH)); // bottom middle
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
