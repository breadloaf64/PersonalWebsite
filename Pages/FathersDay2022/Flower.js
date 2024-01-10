class Flower {
  constructor(x, y, fci) {
    this.x = x;
    this.y = y;
    this.maxR = (random(1) + 2) * squareWidth * 0.028;
    this.r = 0;
    this.petalCount = 10;
    this.age = 0;
    this.ageSpeed = 0.002;
    this.rot = 0;
    this.size = 0;
    this.fci = fci;
    this.visible = false;
  }

  tick() {
    this.age += deltaTime;
    this.r =
      this.maxR * sin(min(this.age * this.ageSpeed, PI * 0.65)) +
      this.maxR * -0.08 * sin(max(0, this.age * this.ageSpeed - PI * 0.65));
    this.rot = sin(this.age * this.ageSpeed * 0.3) * 0.1;
  }

  draw() {
    if (!this.visible) return;
    this.drawPetals();
    noStroke();
    fill(colsFlowerMiddle[this.fci]);
    circle(this.x, this.y, this.r);
  }

  drawPetals() {
    noStroke();
    fill(colsFlowerPetals[this.fci]);
    for (let i = 0; i < this.petalCount; i++) {
      petal(
        this.x,
        this.y,
        (i * PI * 2) / this.petalCount + this.rot,
        this.r,
        this.r * 0.3
      );
    }
  }
}
