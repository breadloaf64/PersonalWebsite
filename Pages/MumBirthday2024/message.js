var waveSpeed = 0.023;

function drawMessage(message, y, size) {
  noStroke();
  let letterSpace = size * 0.7;
  textFont("serif", size);
  fill(0);
  let messageWidth = letterSpace * message.length;

  for (var x = 0; x < message.length; x++) {
    var c = message.charAt(x);
    letter(
      c,
      squareWidth / 2 - messageWidth / 2 + x * letterSpace + margin.x,
      y,
      x,
      (2 * size) / 20,
    );
  }
}

function letter(c, x, y, i, randomAmount) {
  let letterSpeed = waveSpeed * 0.2;
  let posX = x + noise(t * letterSpeed, i * 5) * randomAmount;
  let posY = y + noise(t * letterSpeed, -i * 7) * randomAmount;
  let angleVariance = randomAmount * 0.02;
  let theta = map(
    noise(t * letterSpeed, i * 13),
    0,
    1,
    -angleVariance,
    angleVariance,
  );

  push();
  translate(posX, posY);
  rotate(theta);
  text(c, 0, 0);
  pop();
}
