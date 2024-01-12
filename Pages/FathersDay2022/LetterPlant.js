var stemIncrementSize = 2;

class LetterPlant {
  constructor(x, y, fci) {
    this.seedPos = create(x, y);
    this.age = 0;
    this.maxAge = 100;
    this.minHeight = width / 80;
    this.maxHeight = (width / 80) * 28 * map(random(1), 0, 1, 0.7, 1.1);
    this.height = this.minHeight;
    this.maxHeadSize = width / 15;
    this.colHead = color("#000000");
    this.leafIncrement = width / 35.45;
    this.leafPolarity = random([-1, 1]);
    this.maxLeafSize = width / 4.72;
    this.time = 0;
    this.waveFreq = 1;
    this.waveAmount = 0.1;
    this.angle = 0;
    this.flower = new Flower(
      this.stemPosAtY(this.maxHeight),
      -this.maxHeight,
      fci,
    );
    this.flower.visible = false;
    this.leaves = [];
    this.noiseOffset = random(100);
    this.bloomed = false;
    this.index = fci;
  }

  draw() {
    push();
    translate(this.seedPos.x, this.seedPos.y);
    rotate(this.angle);

    this.drawStem();
    this.drawLeaves();
    this.flower.draw();

    pop();
  }

  drawStem() {
    stroke(colStem);
    strokeWeight(2);

    let stemY = 0;

    while (0 - stemY < this.height) {
      let nextStemY = stemY - stemIncrementSize;
      line(
        this.stemPosAtY(stemY),
        stemY,
        this.stemPosAtY(nextStemY),
        nextStemY,
      );
      stemY -= stemIncrementSize;
    }
  }

  stemPosAtY(y) {
    return noise(y * 0.01, this.noiseOffset) * 50;
  }

  drawLeaves() {
    for (let l of this.leaves) {
      l.draw();
    }
  }

  update() {
    if (this.age > this.maxAge && !this.bloomed) {
      this.bloom();
    }

    for (let l of this.leaves) {
      l.update();
    }
    this.time++;
    this.angle = map(
      sin((this.time / 100) * this.waveFreq),
      -1,
      1,
      (-PI / 16) * this.waveAmount,
      (PI / 16) * this.waveAmount,
    );
    this.flower.tick();
  }

  water(x) {
    if (abs(x - this.seedPos.x) < width * 0.1 && this.age <= this.maxAge) {
      this.age++;
      this.height = map(
        this.age,
        0,
        this.maxAge,
        this.minHeight,
        this.maxHeight,
      );

      //spawn new leaf
      let numLeaves = floor(this.height / this.leafIncrement);
      if (this.leaves.length < numLeaves) {
        let direction = this.leafPolarity * ((numLeaves % 2) * 2 - 1);
        let y = numLeaves * this.leafIncrement;
        let angle = 0;
        if (direction == -1) {
          angle = -PI / 8;
        } else angle = PI + PI / 8;
        this.leaves.push(
          new Leaf(
            this.stemPosAtY(y),
            -y,
            (this.maxLeafSize - (numLeaves * width) / 71) *
              map(random(1), 0, 1, 0.8, 1.2),
            angle,
          ),
        );
      }
    }
  }

  bloom() {
    this.flower.visible = true;
    this.flower.age = 0;
    this.bloomed = true;
    revealPanels[this.index].reveal();
  }
}
