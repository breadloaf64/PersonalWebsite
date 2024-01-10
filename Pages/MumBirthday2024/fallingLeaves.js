class LeafLayer {
  constructor() {
    this.leaves = [];
  }

  tick() {
    this.leaves.map((leaf) => {
      leaf.tick();
    });
    this.handleSpawnLeaves();
    this.leaves = this.leaves.filter((leaf) => !leaf.kill);
  }

  handleSpawnLeaves() {
    const SPAWN_PERIOD = 100;
    const MAX_LEAVES = 100;
    if (t % SPAWN_PERIOD == 0 && this.leaves.length < MAX_LEAVES) {
      this.leaves.push(new Leaf());
    }
  }

  draw() {
    this.leaves.map((leaf) => {
      leaf.draw();
    });
  }
}

class Leaf {
  constructor() {
    this.x = width / 2 + map(random(1), 0, 1, -squareWidth / 2, squareWidth);
    this.y = -10;
    this.age = 0;
    this.size = (map(random(1), 0, 1, 8, 11) * s) / 100;
    this.rotation = 0;

    this.windEffect = map(random(1), 0, 1, 0.3, 1);
    this.swayAmount = map(random(1), 0, 1, 0.3, 1);

    this.kill = false;
  }

  tick() {
    this.age += deltaTime;

    this.y += this.age * 0.00002;
    this.x =
      this.x +
      sin(this.age * 0.001 * this.swayAmount + this.swayAmount * 3) *
        0.8 *
        this.swayAmount;

    this.rotation = sin(
      this.age * 0.001 * this.swayAmount + this.swayAmount * 3
    );

    this.x -= getWindStrength(0) * 2 * this.windEffect;

    if (this.x < 0 || this.y > height) {
      this.kill = true;
    }
  }

  draw() {
    noStroke();
    fill("#ffafcc");

    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    scale(s / 100);

    // one half
    beginShape();
    vertex(0, 0);
    curveVertex(0, 0);
    curveVertex(7, 5);
    curveVertex(0, 20);
    vertex(0, 20);
    endShape();

    // other half
    beginShape();
    vertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-7, 5);
    curveVertex(0, 20);
    vertex(0, 20);
    endShape();

    pop();
  }
}
