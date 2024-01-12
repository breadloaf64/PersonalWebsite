class Skeleton {
  constructor(pos, speed, size) {
    // enemy general attributes
    this.pos = pos;
    this.atCake = false;
    this.hitRadius = u * 6;
    this.destroyed = false;
    this.destroyScore = 10;

    this.lastBiteTime = 0;
    this.biteCooldown = 500; //ms
    this.biteDamage = 3;
    this.size = size;

    this.moveSpeed = speed; // world units per millisecond
  }

  draw() {
    // noStroke();
    // fill(255, 255, 255);
    // rect(this.pos.x, this.pos.y, u * 3, u * 3);

    let scalar = (2 * this.size * u) / 5.376;
    noSmooth();
    let flip = (floor(millis() / 200) % 2) * 2 - 1;
    push();
    translate(this.pos.x, this.pos.y);
    scale(flip, 1);

    image(
      img_skeleton,
      0,
      0,
      img_skeleton.width * scalar,
      img_skeleton.height * scalar,
    );
    pop();
  }

  update() {
    if (!this.atCake) {
      // move to cake
      let toCake = cake.pos.copy().sub(this.pos);

      // move
      let moveDist = min(
        toCake.mag() - cake.eatRadius,
        this.moveSpeed * deltaTime,
      );
      let movement = toCake.copy().normalize().mult(moveDist);
      let delta = toCake.copy().normalize().mult(moveDist);
      this.pos.add(delta);

      // test proximity to cake
      if (this.pos.copy().sub(cake.pos).mag() <= cake.eatRadius) {
        this.atCake = true;
      }
    } else {
      // eat cake
      if (millis() - this.lastBiteTime > this.biteCooldown) {
        this.lastBiteTime = millis();
        cake.damage(this.biteDamage);

        let textPopupPos = this.pos
          .copy()
          .add(createVector(random(5 * u) - 2.5 * u, random(5 * u) - 2.5 * u));
        textPopups.push(
          new TextPopup(textPopupPos, random(["nom", "om"]), u * 2, 700),
        );
      }
    }

    // test proximity to hero
    let dist = this.pos.copy().sub(hero.pos).mag();
    if (dist < this.hitRadius && hero.dashing) {
      this.destroyed = true;
      destroyEffects.push(new DestroyEffect(this.pos, 1));
      random(sfxs_destroy).play();

      let textPopupPos = this.pos
        .copy()
        .add(createVector(random(5 * u) - 2.5 * u, random(5 * u) - 2.5 * u));
      textPopups.push(
        new TextPopup(
          textPopupPos,
          "+" + this.destroyScore * combo,
          u * 4,
          700,
        ),
      );
      score += this.destroyScore * combo;

      hero.enemiesHitDuringDash++;
      combo += hero.enemiesHitDuringDash;
      playComboSound();
    }
  }
}
